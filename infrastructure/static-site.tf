# S3 Bucket

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

# CloudFront

locals {
  s3_origin_id = "s3-${aws_s3_bucket.site_bucket.bucket}"
}

resource aws_cloudfront_origin_access_identity s3_access_identity {
  comment = "access-identity-${aws_s3_bucket.site_bucket.bucket_domain_name}"
}

resource aws_cloudfront_distribution cloudfront {
  enabled             = true
  default_root_object = local.hashed_index_html_name
  aliases             = [local.site_name]

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

# Deploy Site

locals {
  hashed_index_html_name = join(".", [
    "index",
    random_id.index_hash.hex,
    "html"
  ])

  site_path = "${path.module}/../site"
}

resource random_id index_hash {
  byte_length = 8

  keepers = {
    always_run = timestamp()
  }
}

resource null_resource build_and_deploy_to_s3 {
  triggers = {
    index_html = local.hashed_index_html_name
  }

  # install node packages
  provisioner local-exec {
    command     = "npm i"
    working_dir = local.site_path
  }

  # build the files using UmiJS
  provisioner local-exec {
    command     = "umi build"
    working_dir = local.site_path
  }

  # rename index.html so it busts the cache
  provisioner local-exec {
    command     = "mv dist/index.html dist/${local.hashed_index_html_name}"
    working_dir = local.site_path
  }

  # upload built site to S3
  provisioner local-exec {
    command     = "aws s3 sync dist s3://${aws_s3_bucket.site_bucket.id} --delete"
    working_dir = local.site_path
  }
}
