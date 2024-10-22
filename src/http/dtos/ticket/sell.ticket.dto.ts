import { ApiProperty } from "@nestjs/swagger"

export class TicketSellDto {
  @ApiProperty({
    description: 'Event Id',
    example: 'clj0f6n1e0002ldqkce8w3fs7'
  })
  eventId: string

  @ApiProperty({
    description: 'Ticket Id',
    example: 'clj0f6k5d0001ldqkc3yh9r6g'
  })
  ticketId: string

  @ApiProperty({
    description: 'Description',
    example: 'Show de Rock'
  })
  description: string

  @ApiProperty({
    description: 'Price',
    example: 150.0
  })
  price: number
}
