import { Injectable, } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { DeepPartial, FindOptionsWhere, In, Like, Repository } from 'typeorm';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { FilterCustomerDto, SortCustomerDto } from './dto/query-customer.dto';
import {  UsersService} from '../users/users.service';
import { UUID } from 'src/utils/types/uuid';
import { ProjectsService } from 'src/projects/projects.service';
import { CustomerToProject } from './entities/customer-to-project.entity';
//import { CustomerToTicket } from './entities/customer-to-ticket.entity';
import { CustomerToUser } from './entities/customer-to-user.entity';
import { ErrorResponse, OkResponse, Response } from 'src/utils/response-helper';
import { TicketsService } from 'src/tickets/tickets.service';
@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(CustomerToProject)
    private customerToProjectRepository: Repository<CustomerToProject>,
    @InjectRepository(CustomerToUser)
    private customerToUserRepository: Repository<CustomerToUser>,
   // @InjectRepository(CustomerToTicket)
    //private customerToTicketRepository: Repository<CustomerToTicket>,
    //private readonly ticketService: TicketsService,
    //private readonly ticketsService: TicketsService,
  ) {}
  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const res = await this.customerRepository.save(
      this.customerRepository.create(createCustomerDto),
    );
    return res;
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterCustomerDto | null;
    sortOptions?: SortCustomerDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Customer[]> {
    const where: FindOptionsWhere<Customer> = {};
    if (filterOptions?.firstName || filterOptions?.lastName) {
      where.firstName = Like(`%${filterOptions.firstName}%`);
      where.lastName = Like(`%${filterOptions.lastName}%`);
    }
    if (filterOptions?.email) {
      where.email = Like(`%${filterOptions.email}%`);
    }
    if (filterOptions?.phone) {
      where.phone = Like(`%${filterOptions.phone}%`);
    }
    if (filterOptions?.address) {
      where.address = Like(`%${filterOptions.address}%`);
    }
    if (filterOptions?.city) {
      where.city = Like(`%${filterOptions.city}%`);
    }
    if (filterOptions?.country) {
      where.country = Like(`%${filterOptions.country}%`);
    }
    

    return this.customerRepository.find({
      relations: ['customerToProject','customerToProject.project','customerToTicket','customerToTicket.ticket','customerToUser','customerToUser.user'],
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

  async findOne(fields: EntityCondition<Customer>): Promise<NullableType<Customer>> {
    const res = await this.customerRepository.findOne({
      where: fields,
    });
    return res;
  }

  async update(payload: DeepPartial<Customer>,projects: UUID[] | undefined,tickets: UUID[] | undefined , users: UUID[] | undefined, isAppend: boolean ): Promise<Customer> {
    const currentCustomer = await this.customerRepository.findOne({
      where: { id: payload.id },
      relations: ['customerToProject','customerToProject.project','customerToTicket','customerToTicket.ticket','customerToUser','customerToUser.user'],
    });
    if(!currentCustomer){
      throw new Error('Customer not found');
    }
    //TODO: have to check if the project, ticket, user is already assigned to the customer
    if(projects !== undefined){
      if(!isAppend){
          currentCustomer.customerToProjects?.map(async (customerToProject) => {
            await this.customerToProjectRepository.delete({
              id: customerToProject.id,
            });});
          }
      
      projects?.forEach(async (project) => {
        await this.customerToProjectRepository.save(
          this.customerToProjectRepository.create({
            customerId: payload.id,
            projectId: project,
          }),
        );
      });
    }
    /*if(tickets !== undefined){
      if(!isAppend){
        currentCustomer.tickets?.map(async (customerToTicket) => {
          await this.ticketService.softDelete(customerToTicket.id);
        });}
      tickets?.forEach(async (ticket) =>{
        const res = await this.ticketService.findOne({id: ticket});
        if (res?.customer !== currentCustomer){
          throw new Error('Ticket already assigned to another customer');
        }
        if (res){
          throw new Error('Ticket exists');
        }
      });
      tickets?.forEach(async (ticket) => {
        await this.ticketService.create({
          
          customer: currentCustomer,
        })
      });
    }*/
      
  
    if(users !== undefined){
      if(!isAppend){
        currentCustomer.customerToUsers?.map(async (customerToUser) => {
          await this.customerToUserRepository.delete({
            id: customerToUser.id,
          });});
        }
      users?.forEach(async (user) => {
        await this.customerToUserRepository.save(
          this.customerToUserRepository.create({
            customerId: payload.id,
            userId: user,
          }),
        );
      }
      );
    }


    const res = await this.customerRepository.save(
      this.customerRepository.create({
        ...payload,
      }),
    );
    return res;
  }

  async softDelete(id: Customer['id']): Promise<void> {
    await this.customerRepository.softDelete(id);
  }
}
