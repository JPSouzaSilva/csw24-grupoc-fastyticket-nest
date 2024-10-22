import { ApiProperty } from "@nestjs/swagger"

export class ReturnRegisterUserDto{
    @ApiProperty({
        description: 'Name',
        example: 'John da Silva'
      })
      name: string
    
      @ApiProperty({
        description: 'Email',
        example: 'johnsilva@email.com'
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
    
      @ApiProperty({
        description: 'Rate',
        example: 5
      })
      rate: number
    
      @ApiProperty({
        description: 'Balance',
        example: 200.0
      })
      balance: number
    
      @ApiProperty({
        description: 'Verified',
        example: 'joaosilva@email.comJoaodaSilvaclj0f5w9b0000ldqk8zse72y4'
      })
      verified: string
}