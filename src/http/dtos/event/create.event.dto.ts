import { ApiProperty } from "@nestjs/swagger"

export class CreateEventDto {
  @ApiProperty({
    description: 'Tenant Id',
    example: 'clj0f5w9b0000ldqk8zse72y4'
  })
  tenantId: string

  @ApiProperty({
    description: 'Name',
    example: 'Numanice'
  })
  name: string

  @ApiProperty({
    description: 'Type',
    example: 'Show'
  })
  type: string

  @ApiProperty({
    description: 'Location',
    example: 'Parque Harmonia'
  })
  location: string

  @ApiProperty({
    description: 'Owner Id',
    example: 'clj0f6k5d0001ldqkc3yh9r6g'
  })
  ownerId: string

  @ApiProperty({
    description: 'Date and Time',
    example: '2024-10-21T21:30:30.030Z'
  })
  dateAndTime: Date
}
