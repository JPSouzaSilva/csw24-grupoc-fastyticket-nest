import { ApiProperty } from "@nestjs/swagger"

export class AuthenticTicketDto {

  @ApiProperty({
    description: 'Código do Ingresso',
    example: 'clj0f5w9b0000ldqk8zse72y4'
  })
  code: string

  @ApiProperty({
    description: 'User Id',
    example: 'clj0f6k5d0001ldqkc3yh9r6g'
  })
  userId: string

  @ApiProperty({
    description: 'Event Id',
    example: 'clj0f6n1e0002ldqkce8w3fs7'
  })
  eventId: string
}
