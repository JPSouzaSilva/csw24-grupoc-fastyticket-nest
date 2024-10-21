import { Transaction as PrismaTransaction } from '@prisma/client'
import { Transaction } from 'src/application/models/Transaction'

export class TransactionMapper {
  static toDomain(transaction: PrismaTransaction): Transaction {
    return new Transaction(
      {
        buyerId: transaction.buyerId,
        dateTransaction: transaction.transactionDate,
        price: transaction.price,
        status: transaction.transactionStatus,
        tenantId: transaction.tenantId,
        ticketId: transaction.ticketId,
      },
      transaction.transactionId,
    )
  }

  static toPersistence(transaction: Transaction): PrismaTransaction {
    return {
      transactionId: transaction.id,
      buyerId: transaction.buyerId,
      transactionDate: transaction.dateTransaction,
      price: transaction.price,
      transactionStatus: transaction.status,
      tenantId: transaction.tenantId,
      ticketId: transaction.ticketId,
    }
  }
}
