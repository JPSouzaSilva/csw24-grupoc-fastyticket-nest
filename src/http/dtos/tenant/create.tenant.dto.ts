import { ApiProperty } from '@nestjs/swagger'

export class CreateTenantDTO {
  @ApiProperty({
    description: 'Name of the tenant',
  })
  name: string

  @ApiProperty({
    description: 'Contact information of the tenant',
  })
  contactInfo: string

  @ApiProperty({
    description: 'Payment preference of the tenant',
  })
  paymentPreference?: string

  @ApiProperty({
    description: 'Notification preference of the tenant',
  })
  notification?: boolean
}
