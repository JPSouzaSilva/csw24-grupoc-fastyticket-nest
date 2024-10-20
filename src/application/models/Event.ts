import { randomUUID } from 'crypto'

export interface EventProps {
  tenantId: string
  name: string
  type: string
  location: string
  dateAndTime: Date
}

export class Event {
  private _id: string
  private props: EventProps

  constructor(props: EventProps, id?: string) {
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

  public get name(): string {
    return this.props.name
  }

  public set name(name: string) {
    this.props.name = name
  }

  public get type(): string {
    return this.props.type
  }

  public set type(type: string) {
    this.props.type = type
  }

  public get location(): string {
    return this.props.location
  }

  public set location(location: string) {
    this.props.location = location
  }

  public get dateAndTime(): Date {
    return this.props.dateAndTime
  }

  public set dateAndTime(dateAndTime: Date) {
    this.props.dateAndTime = dateAndTime
  }
}
