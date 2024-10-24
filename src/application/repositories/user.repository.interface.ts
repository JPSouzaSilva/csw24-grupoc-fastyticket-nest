import type { User } from '../models/User'

export abstract class IUserRepository {
  abstract create(user: User): Promise<User>
  abstract findAll(): Promise<User[]>
  abstract findByVerified(verified: string): Promise<User | null>
  abstract findByEmailOrUsername(
    email: string,
    name: string,
    tenantId: string,
  ): Promise<User | null>

  abstract findById(id: string): Promise<User | null>
  abstract update(id: string, user: User): Promise<User | null>
  abstract getBalance(id: string): Promise<number>
  abstract delete(id: string): Promise<boolean>
  abstract getRate(id: string): Promise<number>
}
