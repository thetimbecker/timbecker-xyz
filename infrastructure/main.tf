terraform {
  required_version = ">= 0.12.19"

  backend s3 {
    region  = "us-east-1"
    bucket  = "state.tf.timbecker.xyz"
    key     = "terraform.tfstate"
    encrypt = true
  }
}

provider aws {
  version = ">= 2.45.0"
  region  = "us-east-1"
}

provider archive {
  version = ">= 1.3.0"
}

provider random {
  version = ">= 2.2.1"
}

data aws_caller_identity current {}

locals {
  site_name = "timbecker.xyz"
}

######
# DNS
######

data aws_route53_zone site_zone {
  name = local.site_name
}

resource aws_route53_record site_record {
  name    = local.site_name
  type    = "A"
  zone_id = data.aws_route53_zone.site_zone.id

  alias {
    name                   = aws_cloudfront_distribution.cloudfront.domain_name
    zone_id                = aws_cloudfront_distribution.cloudfront.hosted_zone_id
    evaluate_target_health = false
  }
}

##############
# Certificate
##############

resource aws_acm_certificate site_cert {
  domain_name       = local.site_name
  validation_method = "DNS"
}

resource aws_acm_certificate_validation site_cert {
  certificate_arn = aws_acm_certificate.site_cert.arn
}

resource aws_route53_record site_cert_validation {
  name    = aws_acm_certificate.site_cert.domain_validation_options.0.resource_record_name
  type    = aws_acm_certificate.site_cert.domain_validation_options.0.resource_record_type
  zone_id = data.aws_route53_zone.site_zone.id
  records = [aws_acm_certificate.site_cert.domain_validation_options.0.resource_record_value]
  ttl     = 300
}

#####################
# Terraform apply lambda
#####################

locals {
  terraform_apply_lambda_name     = "terraform-apply"
  terraform_apply_lambda_filename = "terraform_apply"
}

# IAM

data aws_iam_policy_document terraform_apply_lambda_assume_role_policy {
  statement {
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource aws_iam_role terraform_apply_lambda_role {
  name_prefix        = "${local.terraform_apply_lambda_name}-role-"
  assume_role_policy = data.aws_iam_policy_document.terraform_apply_lambda_assume_role_policy.json
}

# TODO least privileges
resource aws_iam_role_policy_attachment terraform_apply_lambda_s3_read_only_policy {
  role       = aws_iam_role.terraform_apply_lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
}

# Function

resource random_id terraform_apply_lambda_zip_hash {
  byte_length = 8

  keepers = {
    md5_code = filemd5("${path.module}/lambda/${local.terraform_apply_lambda_filename}.py")
  }
}

data archive_file terraform_apply_zip {
  type        = "zip"
  output_path = "${path.module}/lambda/${local.terraform_apply_lambda_filename}-${random_id.terraform_apply_lambda_zip_hash.hex}.zip"

  source {
    content  = file("${path.module}/lambda/${local.terraform_apply_lambda_filename}.py")
    filename = "${local.terraform_apply_lambda_filename}.py"
  }

  source {
    content  = file("${path.module}/main.tf")
    filename = "main.tf"
  }

  source {
    content  = file("${path.module}/static-site.tf")
    filename = "static-site.tf"
  }

  source {
    content  = file("${path.module}/lambda/${local.terraform_apply_lambda_filename}.py")
    filename = "lambda/${local.terraform_apply_lambda_filename}.py"
  }

  source {
    content  = file("${path.module}/lambda/${local.get_index_html_name_lambda_filename}.py")
    filename = "lambda/${local.get_index_html_name_lambda_filename}.py"
  }
}

resource aws_lambda_function terraform_apply {
  function_name = local.terraform_apply_lambda_name
  role          = aws_iam_role.terraform_apply_lambda_role.arn

  filename = data.archive_file.terraform_apply_zip.output_path
  runtime  = "python3.8"
  handler  = "${local.terraform_apply_lambda_filename}.handler"
  timeout  = 120
  memory_size = 512

  # make sure it's not run concurrently
  reserved_concurrent_executions = 1
}
