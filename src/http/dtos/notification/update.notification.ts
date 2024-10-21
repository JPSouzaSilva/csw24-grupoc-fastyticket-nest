import { ApiProperty } from "@nestjs/swagger";

export class UpdateNotificationDTO {

  @ApiProperty({
    description: 'Receber Email',
    example: true
  })
  receiveEmail: boolean
}
