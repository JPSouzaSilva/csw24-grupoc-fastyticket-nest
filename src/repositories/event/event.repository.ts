import { PrismaService } from 'src/services/prisma.service'
import { IEventRepository } from '../interfaces/event.repository.interface'
import { CreateEventDto } from 'src/http/dtos/create.event.dto'
import { UpdateEventDTO } from 'src/http/dtos/update.event.dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class EventRepository implements IEventRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateEventDto, tenantId: string) {
    return this.prisma.event.create({
      data: {
        name: data.name,
        type: data.type,
        address: data.address,
        dateAndTime: data.dateAndTime,
        tenant: {
          connect: {
            id: tenantId,
          },
        },
      },
    })
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit
    const [events, total] = await this.prisma.$transaction([
      this.prisma.event.findMany({
        skip,
        take: limit,
      }),
      this.prisma.event.count(),
    ])

    return {
      data: events,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    }
  }

  async findById(id: string) {
    return this.prisma.event.findUnique({ where: { id } })
  }

  async update(data: UpdateEventDTO) {
    const { id, tenantId, ...updateData } = data;

    return this.prisma.event.update({
        where: { id },
        data: {
            ...updateData,
            ...(tenantId && {
                tenant: {
                    connect: {
                        id: tenantId,
                    },
                },
            }),
        },
    });
}

  async delete(id: string) {
    return this.prisma.event.delete({ where: { id } }).then(() => true)
  }
}
