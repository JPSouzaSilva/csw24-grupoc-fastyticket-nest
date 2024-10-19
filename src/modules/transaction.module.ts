import { Module } from '@nestjs/common'
import { TransactionRepository } from 'src/repositories/transaction/transaction.repository'
import { PrismaService } from 'src/services/prisma.service'
import { TransactionService } from 'src/services/transaction/transaction.service'

@Module({
  providers: [TransactionService, TransactionRepository, PrismaService],
  exports: [TransactionService],
})
export class TransactionModule {}
