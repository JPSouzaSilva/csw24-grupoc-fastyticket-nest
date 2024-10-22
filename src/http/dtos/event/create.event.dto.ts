import { ApiProperty } from '@nestjs/swagger'

export class CreateEventDto {
  @ApiProperty({
    description: 'Event Name',
  })
  name: string

  @ApiProperty({
    description: 'Type of the event',
  })
  type: string

  @ApiProperty({
    description: 'Location of the event',
  })
  location: string

  @ApiProperty({
    description: 'Date and time of the event',
  })
  dateAndTime: Date
}
