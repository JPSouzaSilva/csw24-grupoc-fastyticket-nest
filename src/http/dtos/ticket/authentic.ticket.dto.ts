import { ApiProperty } from '@nestjs/swagger'

export class AuthenticTicketDto {
  @ApiProperty({
    description: 'Code of the ticket',
  })
  code: string

  @ApiProperty({
    description: 'Event ID',
  })
  eventId: string
}
