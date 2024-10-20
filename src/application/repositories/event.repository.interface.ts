import { PaginatedEventsDto } from 'src/http/dtos/paginated.event.dto'
import type { Event } from '../models/Event'

export abstract class IEventRepository {
  abstract create(event: Event): Promise<Event>

  abstract findAll(
    page: number,
    limit: number,
  ): Promise<PaginatedEventsDto<Event>>

  abstract findById(id: string): Promise<Event | null>
  abstract update(id: string, event: Event): Promise<Event | null>
  abstract delete(id: string): Promise<boolean>
}
