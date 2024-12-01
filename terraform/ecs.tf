provider "aws" {
  region = "us-east-1"
}

resource "aws_vpc" "nestjs_vpc" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "public_subnet_1" {
  vpc_id                  = aws_vpc.nestjs_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true
}

resource "aws_subnet" "public_subnet_2" {
  vpc_id                  = aws_vpc.nestjs_vpc.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "us-east-1b"
  map_public_ip_on_launch = true
}

resource "aws_internet_gateway" "nestjs_igw" {
  vpc_id = aws_vpc.nestjs_vpc.id
}

resource "aws_route_table" "public_route_table" {
  vpc_id = aws_vpc.nestjs_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.nestjs_igw.id
  }
}

resource "aws_route_table_association" "public_subnet_1_assoc" {
  subnet_id      = aws_subnet.public_subnet_1.id
  route_table_id = aws_route_table.public_route_table.id
}

resource "aws_route_table_association" "public_subnet_2_assoc" {
  subnet_id      = aws_subnet.public_subnet_2.id
  route_table_id = aws_route_table.public_route_table.id
}

resource "aws_security_group" "nestjs_security_group" {
  name_prefix = "nestjs-sg"
  vpc_id      = aws_vpc.nestjs_vpc.id

  ingress {
    description = "Allow inbound traffic on port 3000"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allow inbound traffic on port 5432"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_cloudwatch_log_group" "nestjs_log_group" {
  name              = "/ecs/nestjs-service"
  retention_in_days = 7
}

resource "aws_ecs_cluster" "nestjs_cluster" {
  name = "nestjs-cluster"
}

resource "aws_ecs_task_definition" "nestjs_task" {
  family                   = "nestjs-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = "arn:aws:iam::329295135012:role/LabRole" #TROCAR

  container_definitions = jsonencode([{
    name      = "nestjs-container"
    image     = "329295135012.dkr.ecr.us-east-1.amazonaws.com/fastyticket:latest" #TROCAR
    essential = true
    portMappings = [{
      containerPort = 3000
      hostPort      = 3000
    }]
    environment = [
      {
        name  = "DATABASE_URL"
        value = "postgresql://admin:admin@ec2-98-81-227-147.compute-1.amazonaws.com:5432/fastyticket?schema=public" #TROCAR
      }
    ]
    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = aws_cloudwatch_log_group.nestjs_log_group.name
        "awslogs-region"        = "us-east-1"
        "awslogs-stream-prefix" = "nestjs"
      }
    }
  }])
}

resource "aws_ecs_service" "nestjs_service" {
  name            = "nestjs-service"
  cluster         = aws_ecs_cluster.nestjs_cluster.id
  task_definition = aws_ecs_task_definition.nestjs_task.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = [aws_subnet.public_subnet_1.id, aws_subnet.public_subnet_2.id]
    security_groups  = [aws_security_group.nestjs_security_group.id]
    assign_public_ip = true
  }
}

