import { ApiProperty } from "@nestjs/swagger"

export class PreferencesDTO {
  @ApiProperty({
    description: 'Push Notification',
    example: false
  })
  pushNotification: boolean

  @ApiProperty({
    description: 'Email Notification',
    example: true
  })
  emailNotification: boolean
}
