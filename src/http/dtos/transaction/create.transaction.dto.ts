import { ApiProperty } from "@nestjs/swagger"

export class CreateTransactionDto {

  @ApiProperty({
    description: 'Tenant It',
    example: 'clj0f6n1e0002ldqkce8w3fs7'
  })
  tenantId: string

  @ApiProperty({
    description: 'Buyer Id',
    example: 'clj0f6k5d0001ldqkc3yh9r6g'
  })
  buyerId: string

  @ApiProperty({
    description: 'Ticket Id',
    example: 'clj0f5w9b0000ldqk8zse72y4'
  })
  ticketId: string

  @ApiProperty({
    description: 'Price',
    example: 150.0
  })
  price: number

  @ApiProperty({
    description: 'Transaction Date',
    example: '2024-10-21T21:30:30.015Z'
  })
  dateTransaction: Date

  @ApiProperty({
    description: 'Ticket Status',
    example: 'Disponível'
  })
  status: string
}
