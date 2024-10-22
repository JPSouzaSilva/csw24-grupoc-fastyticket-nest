provider "aws" {
  region = "us-east-1"
}

resource "aws_security_group" "securitygroup" {
  name        = "securitygroup"
  description = "Allow HTTP and SSH inbound traffic"

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "nestjs_app" {
  ami             = "ami-06b21ccaeff8cd686" 
  instance_type   = "t2.micro"
  user_data       = file("../user_data.sh")
  vpc_security_group_ids = [aws_security_group.securitygroup.id]
}
