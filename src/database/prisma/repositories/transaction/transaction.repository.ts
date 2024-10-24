import { Injectable } from '@nestjs/common'
import type { ITransactionRepository } from 'src/application/repositories/transaction.repository.interface'
import type { Transaction } from 'src/application/models/Transaction'
import { TransactionMapper } from '../../mappers/transaction/transaction.mapper'
import { PrismaService } from '../../prisma.service'

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findById(id: string): Promise<Transaction | null> {
    const transaction = await this.prisma.transaction.findUnique({
      where: {
        transactionId: id,
      },
    })

    if (!transaction) {
      return null
    }

    return TransactionMapper.toDomain(transaction)
  }

  async update(
    id: string,
    transaction: Transaction,
  ): Promise<Transaction | null> {
    const transactionUpdated = await this.prisma.transaction.update({
      where: {
        transactionId: id,
      },
      data: {
        price: transaction.price,
        transactionDate: transaction.dateTransaction,
        transactionStatus: transaction.status,
        tenant: {
          connect: { tenantId: transaction.tenantId },
        },
        buyer: {
          connect: { userId: transaction.buyerId },
        },
        ticket: {
          connect: { ticketId: transaction.ticketId },
        },
      },
    })

    return TransactionMapper.toDomain(transactionUpdated)
  }

  async create(transaction: Transaction): Promise<Transaction> {
    const transactionCreated = await this.prisma.transaction.create({
      data: {
        transactionId: transaction.id,
        price: transaction.price,
        transactionDate: transaction.dateTransaction,
        transactionStatus: transaction.status,
        tenant: {
          connect: { tenantId: transaction.tenantId },
        },
        buyer: {
          connect: { userId: transaction.buyerId },
        },
        ticket: {
          connect: { ticketId: transaction.ticketId },
        },
      },
    })

    return TransactionMapper.toDomain(transactionCreated)
  }
}
