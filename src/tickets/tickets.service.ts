import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { DeepPartial, FindOptionsWhere, Like, Repository } from 'typeorm';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { FilterTicketDto, SortTicketDto } from './dto/query-ticket.dto';
import {UsersService} from '../users/users.service';
@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}
  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    return this.ticketRepository.save(
      this.ticketRepository.create({
        ...createTicketDto,
        customer: {id: createTicketDto.customerId},
      }),
    );
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterTicketDto | null;
    sortOptions?: SortTicketDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Ticket[]> {
    const where: FindOptionsWhere<Ticket> = {};
    if (filterOptions?.title) {
      where.title = Like(`%${filterOptions.title}%`);
    }
    if(filterOptions?.description){
      where.description = Like(`%${filterOptions.description}%`);
    }
    if(filterOptions?.status){
      where.status = Like(`%${filterOptions.status}%`);
    }
    if(filterOptions?.customerId){
      where.customer = {id: filterOptions.customerId};
    }
    return this.ticketRepository.find({
      relations: ['customer'],
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });
  }

  findOne(fields: EntityCondition<Ticket>): Promise<NullableType<Ticket>> {
    return this.ticketRepository.findOne({
      where: fields,
    });
  }

  update(payload: DeepPartial<Ticket>): Promise<Ticket> {
    return this.ticketRepository.save(
      this.ticketRepository.create({
        ...payload,
      }),
    );
  }

  async softDelete(id: Ticket['id']): Promise<void> {
    await this.ticketRepository.softDelete(id);
  }
}
