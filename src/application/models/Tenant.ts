import { randomUUID } from 'crypto'

export interface PrivacyConfig {
  paymentPreference: string
  notification: boolean
}

export interface TenantProps {
  name: string
  contactInfo: string
  privacyConfig: PrivacyConfig
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

  public get privacyConfig(): PrivacyConfig {
    return this.props.privacyConfig
  }

  public set privacyConfig(privacyConfig: PrivacyConfig) {
    this.props.privacyConfig = privacyConfig
  }
}
