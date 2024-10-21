import { ApiProperty } from "@nestjs/swagger"
import { IsEmail } from "class-validator"

export class LoginDto {
  @ApiProperty({
    description: 'Username',
    example: 'joaosilva123'
  })
  username: string

  @IsEmail()
  @ApiProperty({
    description: 'Email',
    example: 'joaosilva@email.com'
  })
  email: string
}
