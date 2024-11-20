import type { Transaction } from 'src/application/models/Transaction'

export class TransactionView {
  static toResponse(transaction: Transaction) {
    return {
      id: transaction.id,
      buyerId: transaction.buyerId,
      ticketId: transaction.ticketId,
      price: transaction.price,
      dateTransaction: transaction.dateTransaction,
      status: transaction.status,
      tenantId: transaction.tenantId,
    }
  }
}
