import { randomUUID } from 'crypto'

export interface NotificationPreferencesProps {
  userId: string
  receiveEmail: boolean
}

export class NotificationPreferences {
  private _id: string
  private props: NotificationPreferencesProps

  constructor(props: NotificationPreferencesProps, id?: string) {
    this._id = id ?? randomUUID()
    this.props = props
  }

  public get id(): string {
    return this._id
  }

  public get userId(): string {
    return this.props.userId
  }

  public get receiveEmail(): boolean {
    return this.props.receiveEmail
  }

  public set receiveEmail(receiveEmail: boolean) {
    this.props.receiveEmail = receiveEmail
  }
}
