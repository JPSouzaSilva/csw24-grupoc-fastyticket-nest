import { ApiProperty } from "@nestjs/swagger"

export class CreateTicketDto {

  @ApiProperty({
    description: 'Número de Ingressos',
    example: 2000
  })
  numberOfTickets: number

  @ApiProperty({
    description: 'Preço',
    example: 150.0
  })
  price: number

  @ApiProperty({
    description: 'Event Id',
    example: 'clj0f6n1e0002ldqkce8w3fs7'
  })
  eventId: string

  @ApiProperty({
    description: 'Descrição',
    example: 'Show de Rock'
  })
  description?: string
}
