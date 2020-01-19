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

provider null {
  version = ">= 2.1.2"
}

provider random {
version = ">= 2.2.1"
}

locals {
  site_name = "timbecker.xyz"
}

# DNS

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

# Certificate

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
