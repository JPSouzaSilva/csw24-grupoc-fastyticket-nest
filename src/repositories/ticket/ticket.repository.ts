import { Injectable } from "@nestjs/common";
import { ITicketRepository } from "../interfaces/ticket.repository.interface";
import { PrismaService } from "src/services/prisma.service";
import { Prisma, Ticket } from "@prisma/client";

@Injectable()
export class TicketRepository implements ITicketRepository {
    constructor(private readonly prisma: PrismaService) {}

    create(data: Prisma.TicketCreateInput): Promise<Ticket> {
        return this.prisma.ticket.create({
            data: {
                ...data,
                user: {
                    connect: {
                        id: data.user.toString()
                    }
                },
                event: {
                    connect: {
                        id: data.event.toString()
                    }
                },
                tenant: {
                    connect: {
                        id: data.tenant.toString()
                    }
                }
            },
         });
    }
    findAll(page: number, limit: number): Promise<Ticket[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<Ticket> {
        throw new Error("Method not implemented.");
    }
    update(data: Prisma.TicketUpdateInput): Promise<Ticket> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}