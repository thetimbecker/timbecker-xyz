############
# S3 Bucket
############

resource aws_s3_bucket site_bucket {
  bucket = local.site_name

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }
}

resource aws_s3_bucket_public_access_block site_bucket {
  bucket = aws_s3_bucket.site_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

data aws_iam_policy_document s3_allow_cloudfront {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.site_bucket.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.s3_access_identity.iam_arn]
    }
  }
}

resource aws_s3_bucket_policy allow_cloudfront {
  bucket = aws_s3_bucket.site_bucket.id
  policy = data.aws_iam_policy_document.s3_allow_cloudfront.json
}

####################
# Index name lambda
####################

locals {
  get_index_html_name_lambda_name     = "get-index-html-name"
  get_index_html_name_lambda_filename = "get_index_html_name"
}

# IAM

data aws_iam_policy_document get_index_html_name_lambda_assume_role_policy {
  statement {
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource aws_iam_role get_index_html_name_lambda_role {
  name_prefix        = "${local.get_index_html_name_lambda_name}-role-"
  assume_role_policy = data.aws_iam_policy_document.get_index_html_name_lambda_assume_role_policy.json
}

data aws_iam_policy_document get_index_html_name_lambda_role_policy {
  statement {
    actions = ["logs:CreateLogGroup"]
    resources = ["arn:aws:logs:us-east-1:${data.aws_caller_identity.current.account_id}:*"]
  }

  statement {
    actions   = ["logs:CreateLogStream", "logs:PutLogEvents"]
    resources = ["arn:aws:logs:us-east-1:${data.aws_caller_identity.current.account_id}:log-group:/aws/lambda/${local.get_index_html_name_lambda_name}:*"]
  }
}

resource aws_iam_policy get_index_html_name_lambda_role_policy {
  name_prefix = "${local.get_index_html_name_lambda_name}-role-policy-"
  policy      = data.aws_iam_policy_document.get_index_html_name_lambda_role_policy.json
}

resource aws_iam_role_policy_attachment get_index_html_name_lambda_role_policy {
  role       = aws_iam_role.get_index_html_name_lambda_role.name
  policy_arn = aws_iam_policy.get_index_html_name_lambda_role_policy.arn
}

resource aws_iam_role_policy_attachment get_index_html_name_lambda_s3_read_only_policy {
  role       = aws_iam_role.get_index_html_name_lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess"
}

# Function

resource random_id zip_hash {
  byte_length = 8

  keepers = {
    md5_code = filemd5("${path.module}/lambda/${local.get_index_html_name_lambda_filename}.py")
  }
}

data archive_file get_index_html_name_zip {
  type        = "zip"
  source_file = "${path.module}/lambda/${local.get_index_html_name_lambda_filename}.py"
  output_path = "${path.module}/lambda/${local.get_index_html_name_lambda_filename}-${random_id.zip_hash.hex}.zip"
}

resource aws_lambda_function get_index_html_name {
  function_name = local.get_index_html_name_lambda_name
  role          = aws_iam_role.get_index_html_name_lambda_role.arn

  filename      = data.archive_file.get_index_html_name_zip.output_path
  runtime       = "python3.8"
  handler       = "${local.get_index_html_name_lambda_filename}.lambda_handler"
}

data aws_lambda_invocation get_index_html_name {
  function_name = aws_lambda_function.get_index_html_name.function_name
  input         = jsonencode({})
}

#############
# CloudFront
#############

locals {
  s3_origin_id = "s3-${aws_s3_bucket.site_bucket.bucket}"
}

resource aws_cloudfront_origin_access_identity s3_access_identity {
  comment = "access-identity-${aws_s3_bucket.site_bucket.bucket_domain_name}"
}

resource aws_cloudfront_distribution cloudfront {
  enabled             = true
  default_root_object = jsondecode(data.aws_lambda_invocation.get_index_html_name.result)["index_html_name"]
  aliases             = [local.site_name]
  wait_for_deployment = false

  origin {
    domain_name = aws_s3_bucket.site_bucket.bucket_regional_domain_name
    origin_id   = local.s3_origin_id

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.s3_access_identity.cloudfront_access_identity_path
    }
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = local.s3_origin_id
    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 300
    max_ttl                = 1200

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.site_cert.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2018"
  }
}
