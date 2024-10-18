import { Injectable } from '@nestjs/common'
import { CreateTransactionDto } from 'src/http/dtos/create.transaction.dto'
import { TransactionRepository } from 'src/repositories/transaction/transaction.repository'

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}
  create(createTransactionDto: CreateTransactionDto) {
    const { price, date, status, tenantId, userId, ticketId } =
      createTransactionDto

    return this.transactionRepository.createTransaction({
      price,
      dateTransaction: date,
      status,
      tenant: {
        connect: { id: tenantId },
      },
      user: {
        connect: { id: userId },
      },
      ticket: {
        connect: { id: ticketId },
      },
    })
  }
}
