provider "aws" {
  region = "us-east-1" # Altere para sua região
}

resource "aws_instance" "nestjs_app" {
  ami           = "ami-0866a3c8686eaeeba" # Verifique se essa AMI é correta
  instance_type = "t2.micro"
  key_name      = "trabalho1key" # Nome da chave sem extensão

  tags = {
    Name = "NestJS-App"
  }

  # Provisão dos arquivos da aplicação
  provisioner "file" {
    source      = "./src" # Diretório local da aplicação
    destination = "/home/ec2-user/nestjs-app"

    connection {
      type        = "ssh"
      user        = "ec2-user"
      private_key = file("/Users/luisrossi/Downloads/trabalho1key.pem")
      host        = self.public_ip
    }
  }

  # Execução remota para instalar dependências e iniciar a aplicação
  provisioner "remote-exec" {
    inline = [
      "sudo yum update -y", 
      "curl -sL https://rpm.nodesource.com/setup_16.x | sudo bash -", # Instala Node.js
      "sudo yum install -y nodejs git",
      "sudo npm install -g prisma", # Garante que Prisma está disponível globalmente
      "cd /home/ec2-user/nestjs-app",
      "npm install", # Instala dependências
      "npx prisma generate", # Gera o cliente Prisma
      "npx prisma migrate deploy", # Executa as migrações
      "npm run build", # Builda a aplicação
      "npm run start:prod" # Inicia a aplicação em produção
    ]

    connection {
      type        = "ssh"
      user        = "ec2-user"
      private_key = file("/Users/luisrossi/Downloads/trabalho1key.pem")
      host        = self.public_ip
    }
  }
}

# Output para exibir o IP da instância criada
output "instance_ip" {
  value = aws_instance.nestjs_app.public_ip
}
