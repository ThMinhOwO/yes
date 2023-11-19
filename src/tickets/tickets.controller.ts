import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  SerializeOptions,
  HttpStatus,
  HttpCode,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { QueryTicketDto } from './dto/query-ticket.dto';
import { InfinityPaginationResultType } from 'src/utils/types/infinity-pagination-result.type';
import { Ticket } from './entities/ticket.entity';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { NullableType } from 'src/utils/types/nullable.type';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { UUID } from 'src/utils/types/uuid';
import { OkResponseWithPagination, Response, ResponseWithPagination, OkResponse, ErrorResponse } from 'src/utils/response-helper';
@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Tickets')
@Controller({
  path: 'tickets',
  version: '1',
})
export class TicketsController {
  constructor(
    private readonly ticketsService: TicketsService,

    ) {}

  @SerializeOptions({
    groups: ['admin'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTicketDto: CreateTicketDto): Promise<Response<Ticket>> {
    //get current user id

    return new OkResponse(await this.ticketsService.create(createTicketDto));
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryTicketDto,
  ): Promise<ResponseWithPagination<Ticket>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }
    const res = await this.ticketsService.findManyWithPagination({
      filterOptions: query?.filters,
      sortOptions: query?.sort,
      paginationOptions: {
        page,
        limit,
      },
    });
    return new OkResponseWithPagination(
      res,
      res.length === limit,
    );
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: UUID): Promise<Response<Ticket>> {
    const res = await this.ticketsService.findOne({ id: id });
    return res ? new OkResponse(res) : new ErrorResponse('Ticket not found', HttpStatus.NOT_FOUND);
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Patch()
  @HttpCode(HttpStatus.OK)
  async update(
    @Body() updateTicketDto: UpdateTicketDto,
  ): Promise<Response<Ticket>> {
    const res = await this.ticketsService.update(updateTicketDto);
    return res ? new OkResponse(res) : new ErrorResponse('Ticket cannot update', HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: UUID): Promise<Response<string>> {
    await this.ticketsService.softDelete(id);
    return new OkResponse('Ticket deleted');
  }
}
