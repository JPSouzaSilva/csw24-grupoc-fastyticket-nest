export function ticketSoldEmail(eventName: string): string {
  return ` <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seu Ingresso Foi Vendido!</title>
    <style>
        body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
        }
        .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
        background-color: #4CAF50;
        color: #ffffff;
        padding: 20px;
        text-align: center;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        }
        .header h1 {
        margin: 0;
        }
        .content {
        margin: 20px 0;
        color: #333333;
        line-height: 1.6;
        }
        .content p {
        margin: 10px 0;
        }
        .footer {
        margin-top: 30px;
        font-size: 12px;
        text-align: center;
        color: #777777;
        }
    </style>
    </head>
    <body>
    <div class="container">
        <div class="header">
        <h1>Seu ingresso foi vendido!</h1>
        </div>
        <div class="content">
        <p>Olá,</p>
        <p>Temos ótimas notícias! O seu ingresso para o evento <strong>${eventName}</strong> foi vendido com sucesso.</p>
        <p>Obrigado por usar nossa plataforma para vender seus ingressos.</p>
        <p>Se você tiver alguma dúvida, entre em contato com nossa equipe de suporte.</p>
        </div>
        <div class="footer">
        <p>FastyTicket | Todos os direitos reservados</p>
        </div>
    </div>
    </body>
    </html>
`
}
