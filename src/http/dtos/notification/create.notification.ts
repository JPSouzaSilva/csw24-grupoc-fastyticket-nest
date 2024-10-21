import { ApiProperty } from "@nestjs/swagger"

export class CreateNotificationDto {

  @ApiProperty({
    description: 'User Id',
    example: 'clj0f5w9b0000ldqk8zse72y4'
  })
  userId: string

  @ApiProperty({
    description: 'Receive Email',
    example: true
  })
  receiveEmail: boolean
}
