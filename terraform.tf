provider "aws" {
  region = "us-east-1" # Altere para sua região
}

resource "aws_instance" "nestjs_app" {
  ami           = "ami-0c55b159cbfafe1f0" # Amazon Linux 2
  instance_type = "t2.micro"
  key_name      = "your-key-pair" # Substitua pelo seu par de chaves

  tags = {
    Name = "NestJS-App"
  }

  # Provisione a aplicação e instale dependências
  provisioner "file" {
    source      = "./src" # Diretório local da aplicação
    destination = "/home/ec2-user/nestjs-app"
    
    connection {
      type        = "ssh"
      user        = "ec2-user"
      private_key = file("~/.ssh/your-private-key.pem")
      host        = self.public_ip
    }
  }

  provisioner "remote-exec" {
    inline = [
      "sudo yum update -y",
      "curl -sL https://rpm.nodesource.com/setup_16.x | sudo bash -", # Instala Node.js
      "sudo yum install -y nodejs",
      "cd /home/ec2-user/nestjs-app",
      "npm install", # Instala dependências da aplicação
      "npx prisma generate", # Gera o cliente Prisma
      "npx prisma migrate deploy", # Executa as migrações
      "npm run build", # Builda a aplicação
      "npm run start:prod" # Inicia a aplicação
    ]

    connection {
      type        = "ssh"
      user        = "ec2-user"
      private_key = file("~/.ssh/your-private-key.pem")
      host        = self.public_ip
    }
  }
}

output "instance_ip" {
  value = aws_instance.nestjs_app.public_ip
}
