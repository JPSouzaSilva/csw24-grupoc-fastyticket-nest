import type { User as PrismaUser } from '@prisma/client'
import { User } from 'src/application/models/User'

export class UserMapper {
  static toDomain(user: PrismaUser): User {
    return new User(
      {
        email: user.email,
        name: user.name,
        role: user.role,
        tenantId: user.tenantId,
        rate: user.rate,
        balance: user.balance,
        verified: user.verified,
      },
      user.userId,
    )
  }

  static toPersistence(user: User): PrismaUser {
    return {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      tenantId: user.tenantId,
      rate: user.rate,
      balance: user.balance,
      verified: user.verified,
    }
  }
}
