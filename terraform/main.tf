provider "aws" {
  region = "us-east-1" # Altere para sua região
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
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = -1
    to_port     = -1
    protocol    = "icmp"
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
  ami                         = "ami-06b21ccaeff8cd686"
  instance_type               = "t2.micro"
  user_data                   = file("../user_data.sh")
  associate_public_ip_address = true  
  vpc_security_group_ids      = [aws_security_group.securitygroup.id]
}
