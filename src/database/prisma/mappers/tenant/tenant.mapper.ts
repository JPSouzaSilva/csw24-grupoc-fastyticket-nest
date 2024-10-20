import { Tenant as PrismaTenant } from '@prisma/client'
import { Tenant } from 'src/application/models/Tenant'

export class TenantMapper {
  static toDomain(tenant: PrismaTenant): Tenant {
    return new Tenant(
      {
        name: tenant.name,
        contactInfo: tenant.contactInfo,
        privacyConfig: {
          paymentPreference: tenant.specificSettings, // Rever
          notification: false, // Rever
        },
      },
      tenant.tenantId,
    )
  }

  static toPersistence(tenant: Tenant): PrismaTenant {
    return {
      tenantId: tenant.id,
      name: tenant.name,
      contactInfo: tenant.contactInfo,
      specificSettings: tenant.privacyConfig.paymentPreference, // Rever
    }
  }
}
