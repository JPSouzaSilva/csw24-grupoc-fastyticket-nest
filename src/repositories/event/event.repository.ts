import { PrismaService } from 'src/services/prisma.service'
import { IEventRepository } from '../interfaces/event.repository.interface'
import { CreateEventDto } from 'src/http/dtos/create.event.dto'
import { UpdateEventDTO } from 'src/http/dtos/update.event.dto'

export class EventRepository extends IEventRepository {
  constructor(private readonly prisma: PrismaService) {
    super()
  }

  async create(data: CreateEventDto) {
    return this.prisma.event.create({
      data: {
        name: data.name,
        type: data.type,
        address: data.address,
        dateAndTime: data.dateAndTime,
        tenant: {
          connect: {
            id: data.tenantId,
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
    return this.prisma.event.update({ where: { id }, data })
  }

  async delete(id: string) {
    return this.prisma.event.delete({ where: { id } }).then(() => true)
  }
}
