import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @ApiProperty({
    description: 'username',
    example: 'joaosilva123',
  })
  username: string

  @ApiProperty({
    description: 'email',
    example: 'joaosilva@email.com',
  })
  email: string

  @ApiProperty({
    description: 'tenantId',
    example: '123',
  })
  tenantId: string
}
