import { ApiProperty } from "@nestjs/swagger"

export class RegisterUserDto {
  @ApiProperty({
    description: 'Name',
    example: 'João da Silva'
  })
  name: string

  @ApiProperty({
    description: 'Email',
    example: 'joaosilva@email.com'
  })
  email: string

  @ApiProperty({
    description: 'Role',
    example: 'ADMIN'
  })
  role: string

  @ApiProperty({
    description: 'Tenant Id',
    example: 'clj0f5w9b0000ldqk8zse72y4'
  })
  tenantId: string
}
