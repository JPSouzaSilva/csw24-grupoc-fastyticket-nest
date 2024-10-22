import { ApiProperty } from "@nestjs/swagger"

export class CreateTenantDTO {
  @ApiProperty({
    description: 'Tenant Name',
    example: 'Sympla'
  })
  name: string

  @ApiProperty({
    description: 'Contact Info',
    example: 'example@email.com'
  })
  contactInfo: string

  @ApiProperty({
    description: 'Payment Preference',
    example: 'Bitcoin'
  })
  paymentPreference?: string

  @ApiProperty({
    description: 'Notification',
    example: true
  })
  notification?: boolean
}
