import { randomUUID } from 'crypto'

export interface UserProps {
  name: string
  email: string
  role: string
  tenantId: string
  rate?: number
  balance?: number
}

export class User {
  private _id: string
  private props: UserProps

  constructor(props: UserProps, id?: string) {
    this._id = id ?? randomUUID()
    this.props = props
  }

  public get id(): string {
    return this._id
  }

  public get name(): string {
    return this.props.name
  }

  public set name(name: string) {
    this.props.name = name
  }

  public get email(): string {
    return this.props.email
  }

  public set email(email: string) {
    this.props.email = email
  }

  public get role(): string {
    return this.props.role
  }

  public set role(role: string) {
    this.props.role = role
  }

  public get tenantId(): string {
    return this.props.tenantId
  }

  public set tenantId(tenantId: string) {
    this.props.tenantId = tenantId
  }

  public get rate(): number {
    return this.props.rate
  }

  public set rate(rate: number) {
    this.props.rate = rate
  }

  public get balance(): number {
    return this.props.balance
  }

  public set balance(balance: number) {
    this.props.balance = balance
  }
}
