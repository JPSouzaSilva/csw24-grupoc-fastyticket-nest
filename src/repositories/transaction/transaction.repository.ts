import { Prisma, Transaction } from '@prisma/client'
import { ITransactionRepository } from '../interfaces/transaction.repository.interface'
import { PrismaService } from 'src/services/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(private readonly prisma: PrismaService) {}
  async createTransaction(
    createTransactionDto: Prisma.TransactionCreateInput,
  ): Promise<Transaction> {
    return await this.prisma.transaction.create({ data: createTransactionDto })
  }
}
