# VPC
resource "aws_vpc" "nestjs_vpc" {
  cidr_block = "10.0.0.0/16"
}

# Subnets públicas
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

# Internet Gateway
resource "aws_internet_gateway" "nestjs_igw" {
  vpc_id = aws_vpc.nestjs_vpc.id
}

# Tabela de rotas públicas
resource "aws_route_table" "public_route_table" {
  vpc_id = aws_vpc.nestjs_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.nestjs_igw.id
  }
}

# Associação de tabelas de rotas às subnets públicas
resource "aws_route_table_association" "public_subnet_1_assoc" {
  subnet_id      = aws_subnet.public_subnet_1.id
  route_table_id = aws_route_table.public_route_table.id
}

resource "aws_route_table_association" "public_subnet_2_assoc" {
  subnet_id      = aws_subnet.public_subnet_2.id
  route_table_id = aws_route_table.public_route_table.id
}

# Cluster ECS
resource "aws_ecs_cluster" "nestjs_cluster" {
  name = "nestjs-cluster"
}

# IAM Role para execução de tarefas ECS
resource "aws_iam_role" "ecs_task_role" {
  name = "ecsTaskExecutionRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })
}

# Anexar políticas ao IAM Role
resource "aws_iam_policy_attachment" "ecs_task_execution_policy" {
  name       = "ecsTaskExecutionPolicy"
  roles      = [aws_iam_role.ecs_task_role.name]
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# Task Definition
resource "aws_ecs_task_definition" "nestjs_task" {
  family                   = "nestjs-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = aws_iam_role.ecs_task_role.arn

  container_definitions = jsonencode([{
    name      = "nestjs-container"
    image     = "jpsouzasilva/fastyticket:latest" # Substitua pelo nome correto da sua imagem no Docker Hub
    essential = true
    portMappings = [{
      containerPort = 3000
      hostPort      = 3000
    }]
  }])
}

# Serviço ECS
resource "aws_ecs_service" "nestjs_service" {
  name            = "nestjs-service"
  cluster         = aws_ecs_cluster.nestjs_cluster.id
  task_definition = aws_ecs_task_definition.nestjs_task.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = [aws_subnet.public_subnet_1.id, aws_subnet.public_subnet_2.id]
    security_groups  = [aws_security_group.securitygroup.id]
    assign_public_ip = true
  }
}
