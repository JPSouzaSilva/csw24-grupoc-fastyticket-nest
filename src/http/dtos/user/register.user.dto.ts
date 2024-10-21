import { ApiProperty } from "@nestjs/swagger"

export class RegisterUserDto {
  @ApiProperty({
    description: 'Nome do Usuario',
    example: 'Joao da Silva'
  })
  name: string

  @ApiProperty({
    description: 'Email do Usuario',
    example: 'joaosilva@email.com'
  })
  email: string

  @ApiProperty({
    description: 'Papel do Usuario',
    example: 'ADMIN'
  })
  role: string

  @ApiProperty({
    description: 'Tenant Id',
    example: 'clj0f5w9b0000ldqk8zse72y4'
  })
  tenantId: string
}
