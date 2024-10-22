import { ApiProperty } from "@nestjs/swagger"

export class TicketBuyDto {
  @ApiProperty({
    description: 'Event Id',
    example: 'clj0f6n1e0002ldqkce8w3fs7'
  })
  eventId: string

  @ApiProperty({
    description: 'Tickets',
    example: [
      'clj0f6n1e0002ldqkce8w3fs7',
      'clj0f6p7f0003ldqkcx1x2t8b',
      'clj0f6rjg0004ldqkds3j5c9t'
    ]
  })
  tickets: string[]
}
