import { randomUUID } from 'crypto'

export interface TenantProps {
  name: string
  contactInfo: string
  paymentPreference: string
  notification: boolean
}

export class Tenant {
  private _id: string
  private props: TenantProps

  constructor(props: TenantProps, id?: string) {
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

  public get contactInfo(): string {
    return this.props.contactInfo
  }

  public set contactInfo(contactInfo: string) {
    this.props.contactInfo = contactInfo
  }

  public get paymentPreference(): string {
    return this.props.paymentPreference
  }

  public set paymentPreference(paymentPreference: string) {
    this.props.paymentPreference = paymentPreference
  }

  public get notification(): boolean {
    return this.props.notification
  }

  public set notification(notification: boolean) {
    this.props.notification = notification
  }
}
