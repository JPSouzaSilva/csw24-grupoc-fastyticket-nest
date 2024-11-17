import type { Tenant } from 'src/application/models/Tenant'

export class TenantView {
  static toResponse(tenant: Tenant) {
    return {
      id: tenant.id,
      name: tenant.name,
      contactInfo: tenant.contactInfo,
      paymentPreference: tenant.paymentPreference,
      notification: tenant.notification,
    }
  }
}
