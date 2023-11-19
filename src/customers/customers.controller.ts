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
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { QueryCustomerDto } from './dto/query-customer.dto';
import { InfinityPaginationResultType } from 'src/utils/types/infinity-pagination-result.type';
import { Customer } from './entities/customer.entity';
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
@ApiTags('Customers')
@Controller({
  path: 'customers',
  version: '1',
})
export class CustomersController {
  constructor(
    private readonly customersService: CustomersService,

    ) {}

  @SerializeOptions({
    groups: ['admin'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<Response<Customer>> {
    //get current user id

    return new OkResponse(await this.customersService.create(createCustomerDto));
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryCustomerDto,
  ): Promise<ResponseWithPagination<Customer>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }
    const res = await this.customersService.findManyWithPagination({
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
  async findOne(@Param('id') id: UUID): Promise<Response<Customer>> {
    const res = await this.customersService.findOne({ id: id });
    return res ? new OkResponse(res) : new ErrorResponse('Customer not found', HttpStatus.NOT_FOUND);
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Patch()
  @HttpCode(HttpStatus.OK)
  async update(
    @Body() updateCustomerDto: UpdateCustomerDto,
    @Body() isAppend: boolean,
  ): Promise<Response<Customer>> {
    try {
      const res = await this.customersService.update({
        id: updateCustomerDto.id,
        firstName: updateCustomerDto.firstName,
        lastName: updateCustomerDto.lastName,
        email: updateCustomerDto.email,
        phone: updateCustomerDto.phone,
        address: updateCustomerDto.address,
        city: updateCustomerDto.city,
        country: updateCustomerDto.country,
        avatar: updateCustomerDto.avatar,
      },updateCustomerDto.projects,updateCustomerDto.tickets,updateCustomerDto.users,
      isAppend
      );
      return res ? new OkResponse(res) : new ErrorResponse('Customer cannot update', HttpStatus.NOT_FOUND);
    } catch (error) {
      console.log(error);
      return new ErrorResponse(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: UUID): Promise<Response<string>> {
    await this.customersService.softDelete(id);
    return new OkResponse('Customer deleted successfully');
  }
}
