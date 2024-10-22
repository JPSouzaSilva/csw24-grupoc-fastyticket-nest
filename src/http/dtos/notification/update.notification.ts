import { ApiProperty } from "@nestjs/swagger";

export class UpdateNotificationDTO {
  @ApiProperty({
    description: 'Receive Email',
    example: true
  })
  receiveEmail: boolean
}
