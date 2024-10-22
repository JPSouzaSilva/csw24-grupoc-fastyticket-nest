import { ApiProperty } from '@nestjs/swagger'

export class CreateTicketDto {
  @ApiProperty({
    description: 'Number of tickets wanted',
  })
  numberOfTickets: number

  @ApiProperty({
    description: 'Price of the ticket',
  })
  price: number

  @ApiProperty({
    description: 'Event ID',
  })
  eventId: string

  @ApiProperty({
    description: 'Description of the ticket',
  })
  description?: string
}
