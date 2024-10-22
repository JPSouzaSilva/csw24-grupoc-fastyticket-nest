import { ApiProperty } from "@nestjs/swagger"

export class CreateEventDto {
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
    description: 'Date and Time',
    example: '2024-10-21T21:30:30.030Z'
  })
  dateAndTime: Date
}
