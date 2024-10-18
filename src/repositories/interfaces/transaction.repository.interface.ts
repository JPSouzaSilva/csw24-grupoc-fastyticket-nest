import { Prisma, Transaction } from '@prisma/client'

export abstract class ITransactionRepository {
  abstract createTransaction(
    createTransactionDto: Prisma.TransactionCreateInput,
  ): Promise<Transaction>
}
