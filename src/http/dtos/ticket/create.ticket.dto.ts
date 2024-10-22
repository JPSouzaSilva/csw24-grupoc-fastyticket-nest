import { ApiProperty } from "@nestjs/swagger"

export class CreateTicketDto {
  @ApiProperty({
    description: 'Number of Tickets',
    example: 2000
  })
  numberOfTickets: number

  @ApiProperty({
    description: 'Price',
    example: 150.0
  })
  price: number

  @ApiProperty({
    description: 'Event Id',
    example: 'clj0f6n1e0002ldqkce8w3fs7'
  })
  eventId: string

  @ApiProperty({
    description: 'Description',
    example: 'Show de Rock'
  })
  description?: string
}
