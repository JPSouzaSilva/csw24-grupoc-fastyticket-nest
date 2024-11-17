import type { User } from 'src/application/models/User'

export class UserView {
  static toResponse(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
      rate: user.rate ?? 0,
      balance: user.balance ?? 0,
      verified: user.verified,
    }
  }
}
