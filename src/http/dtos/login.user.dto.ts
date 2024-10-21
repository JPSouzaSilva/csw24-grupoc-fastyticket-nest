import { ApiProperty } from "@nestjs/swagger"

export class LoginDto {
  @ApiProperty({
    description: 'Username',
    example: 'joaosilva123'
  })
  username: string

  @ApiProperty({
    description: 'Email do Usuario',
    example: 'joaosilva@email.com'
  })
  email: string
}
