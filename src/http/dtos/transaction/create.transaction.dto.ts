export class CreateTransactionDto {
  tenantId: string
  buyerId: string
  ticketId: string
  price: number
  dateTransaction: Date
  status: string
}
