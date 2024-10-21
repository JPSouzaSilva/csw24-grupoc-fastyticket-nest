import { ApiProperty } from "@nestjs/swagger"

export class CreateTenantDTO {

  @ApiProperty({
    description: 'Nome do Tenant',
    example: 'Sympla'
  })
  name: string

  @ApiProperty({
    description: 'Info de Contato',
    example: 'email@exemplo.com'
  })
  contactInfo: string

  @ApiProperty({
    description: 'Preferência de Pagamento',
    example: 'Bitcoin'
  })
  paymentPreference?: string

  @ApiProperty({
    description: 'Receber Notificação',
    example: true
  })
  notification?: boolean
}
