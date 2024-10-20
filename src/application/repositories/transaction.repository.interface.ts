import type { Transaction } from '../models/Transaction'

export abstract class ITransactionRepository {
  abstract create(transaction: Transaction): Promise<Transaction>
}
