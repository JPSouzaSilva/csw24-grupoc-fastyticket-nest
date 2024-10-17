import { Event } from "@prisma/client";
import { CreateEventDto } from "src/http/dtos/create.event.dto";
import { PaginatedEventsDto } from "src/http/dtos/paginated.event.dto";
import { UpdateEventDTO } from "src/http/dtos/update.event.dto";

export abstract class IEventRepository {
    abstract create(data: CreateEventDto): Promise<Event>
    abstract findAll(page: number, limit: number): Promise<PaginatedEventsDto<Event>>
    abstract findById(id: string): Promise<Event>
    abstract update(data: UpdateEventDTO): Promise<Event>
    abstract delete(id: string): Promise<boolean>
}