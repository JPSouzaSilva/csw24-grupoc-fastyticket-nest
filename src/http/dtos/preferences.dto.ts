import { ApiProperty } from "@nestjs/swagger"

export class PreferencesDTO {
  @ApiProperty({
    description: 'Push Notification',
    example: false
  })
  pushNotification: boolean

  @ApiProperty({
    description: 'Notificação de Email',
    example: true
  })
  emailNotification: boolean
}
