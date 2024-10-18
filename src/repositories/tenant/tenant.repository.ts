import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/services/prisma.service'
import { ITenantRepository } from '../interfaces/tenant.repository.interface'
import { isStringObject } from 'util/types'
import { isString } from 'util'

@Injectable()
export class TenantRepository implements ITenantRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    return this.prisma.tenant.findMany()
  }

  async findById(id: string) {
    return this.prisma.tenant.findUnique({ where: { id } })
  }

  async update(id: string, data: Prisma.TenantUpdateInput) {
    return this.prisma.tenant.update({ where: { id }, data })
  }

  async delete(id: string) {
    return this.prisma.tenant.delete({ where: { id } }).then(() => true)
  }

  async create(data: Prisma.TenantCreateInput) {
    if (typeof data.userId === 'string'){
      return this.prisma.tenant.create({
          data: {
              name: data.name,
              contactInfo: data.contactInfo,
              userId: {
                  connect: {
                      id: data.userId,
                  },
              },
              Event: data.Event,
              Ticket: data.Ticket,
              Transaction: data.Transaction,
          },
      });
    } else {
      return this.prisma.tenant.create({data})
    }
}

}
