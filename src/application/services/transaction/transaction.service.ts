import { Injectable } from '@nestjs/common'
import { Transaction } from 'src/application/models/Transaction'
import { ITransactionRepository } from 'src/application/repositories/transaction.repository.interface'
import { CreateTransactionDto } from 'src/http/dtos/transaction/create.transaction.dto'

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: ITransactionRepository) {}
  async create(createTransactionDto: CreateTransactionDto) {
    const { ticketId, buyerId, dateTransaction, price, status, tenantId } =
      createTransactionDto

    const transaction = new Transaction({
      ticketId,
      buyerId,
      dateTransaction,
      price,
      status,
      tenantId,
    })

    return this.transactionRepository.create(transaction)
  }

  async findById(id: string) {
    return this.transactionRepository.findById(id)
  }
}
