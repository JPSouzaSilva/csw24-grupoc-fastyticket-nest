import { ApiProperty } from '@nestjs/swagger'

export class TicketBuyDto {
  @ApiProperty({
    description: 'Event ID',
  })
  eventId: string

  @ApiProperty({
    description: 'List of ticketsId to buy',
  })
  tickets: string[]
}
