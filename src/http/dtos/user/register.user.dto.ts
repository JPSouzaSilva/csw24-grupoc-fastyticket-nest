import { ApiProperty } from '@nestjs/swagger'

export class RegisterUserDto {
  @ApiProperty({
    description: 'Name',
    example: 'John da Silva',
  })
  name: string

  @ApiProperty({
    description: 'Email',
    example: 'johnsilva@email.com',
  })
  email: string

  @ApiProperty({
    description: 'Tenant Id',
    example: 'clj0f5w9b0000ldqk8zse72y4',
  })
  tenantId: string
}
