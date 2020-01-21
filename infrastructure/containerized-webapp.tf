resource aws_ecs_cluster cluster {
  name = local.dashed_site_name

  capacity_providers = ["FARGATE_SPOT"]

  default_capacity_provider_strategy {
    capacity_provider = "FARGATE_SPOT"
    weight            = 100
  }
}

resource aws_ecr_repository site {
  name = local.site_name
}

resource aws_ecs_task_definition site {
  family                   = local.dashed_site_name
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  memory                   = 512
  cpu                      = 256

  container_definitions = jsonencode([
    {
      name : local.dashed_site_name,
      image : "${aws_ecr_repository.site.repository_url}/${local.site_name}:latest",
      essential : true,
      portMappings : [
        {
          containerPort : 80
        }
      ]
    }
  ])
}

resource aws_iam_role task_role {
  assume_role_policy = ""
}
