import { randomUUID } from 'crypto'

export interface TransactionProps {
  tenantId: string
  buyerId: string
  ticketId: string
  price: number
  dateTransaction: Date
  status: string
}

export class Transaction {
  private _id: string
  private props: TransactionProps

  constructor(props: TransactionProps, id?: string) {
    this._id = id ?? randomUUID()
    this.props = props
  }

  public get id(): string {
    return this._id
  }

  public get tenantId(): string {
    return this.props.tenantId
  }

  public set tenantId(tenantId: string) {
    this.props.tenantId = tenantId
  }

  public get buyerId(): string {
    return this.props.buyerId
  }

  public set buyerId(buyerId: string) {
    this.props.buyerId = buyerId
  }

  public get ticketId(): string {
    return this.props.ticketId
  }

  public set ticketId(ticketId: string) {
    this.props.ticketId = ticketId
  }

  public get price(): number {
    return this.props.price
  }

  public set price(price: number) {
    this.props.price = price
  }

  public get dateTransaction(): Date {
    return this.props.dateTransaction
  }

  public set dateTransaction(dateTransaction: Date) {
    this.props.dateTransaction = dateTransaction
  }

  public get status(): string {
    return this.props.status
  }

  public set status(status: string) {
    this.props.status = status
  }
}
