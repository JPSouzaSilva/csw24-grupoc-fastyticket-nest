import { randomUUID } from 'crypto'

export interface TicketProps {
  eventId: string
  tenantId: string
  price: number
  sellerId: string
  code: string
  status: string
  description?: string
}

export class Ticket {
  private _id: string
  private props: TicketProps

  constructor(props: TicketProps, id?: string) {
    this._id = id ?? randomUUID()
    this.props = props
  }

  public get id(): string {
    return this._id
  }

  public get eventId(): string {
    return this.props.eventId
  }

  public set eventId(eventId: string) {
    this.props.eventId = eventId
  }

  public get tenantId(): string {
    return this.props.tenantId
  }

  public set tenantId(tenantId: string) {
    this.props.tenantId = tenantId
  }

  public get price(): number {
    return this.props.price
  }

  public set price(price: number) {
    this.props.price = price
  }

  public get sellerId(): string {
    return this.props.sellerId
  }

  public set sellerId(sellerId: string) {
    this.props.sellerId = sellerId
  }

  public get code(): string {
    return this.props.code
  }

  public set code(code: string) {
    this.props.code = code
  }

  public get status(): string {
    return this.props.status
  }

  public set status(status: string) {
    this.props.status = status
  }

  public get description(): string {
    return this.props.description
  }

  public set description(description: string) {
    this.props.description = description
  }
}
