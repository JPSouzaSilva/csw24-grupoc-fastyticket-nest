import type { Transaction } from '../models/Transaction'

export abstract class ITransactionRepository {
  abstract create(transaction: Transaction): Promise<Transaction>
  abstract findById(id: string): Promise<Transaction | null>
  abstract update(
    id: string,
    transaction: Transaction,
  ): Promise<Transaction | null>
}
