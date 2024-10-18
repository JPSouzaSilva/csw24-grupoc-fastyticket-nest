export class RegisterUserDto {
    name: string
    email: string
    role: string
    tenantId?: string | null
    notificationPreferencesId?: string | null
    privacyConfigId?: string | null
}