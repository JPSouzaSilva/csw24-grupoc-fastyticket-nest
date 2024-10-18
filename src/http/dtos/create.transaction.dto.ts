export class CreateTransactionDto {
  price: number
  date: Date | string
  status: string
  tenantId: string
  userId: string
  ticketId: string
}
