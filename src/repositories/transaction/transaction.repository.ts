import { Prisma, Transaction } from '@prisma/client'
import { ITransactionRepository } from '../interfaces/transaction.repository.interface'
import { PrismaService } from 'src/services/prisma.service'

export class TransactionRepository implements ITransactionRepository {
  constructor(private readonly prisma: PrismaService) {}
  createTransaction(
    createTransactionDto: Prisma.TransactionCreateInput,
  ): Promise<Transaction> {
    return this.prisma.transaction.create({ data: createTransactionDto })
  }
}
