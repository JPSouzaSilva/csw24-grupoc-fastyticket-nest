import { ApiProperty } from "@nestjs/swagger"

export class RegisterUserDto {
  @ApiProperty({
    description: 'Nome do Usuário',
    example: 'João da Silva'
  })
  name: string

  @ApiProperty({
    description: 'Email do Usuário',
    example: 'joaosilva@email.com'
  })
  email: string

  @ApiProperty({
    description: 'Papel do Usuário',
    example: 'ADMIN'
  })
  role: string

  @ApiProperty({
    description: 'Tenant Id',
    example: 'clj0f5w9b0000ldqk8zse72y4'
  })
  tenantId: string
}
