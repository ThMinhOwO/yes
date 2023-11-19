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
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { QueryReviewDto } from './dto/query-review.dto';
import { InfinityPaginationResultType } from 'src/utils/types/infinity-pagination-result.type';
import { Review } from './entities/review.entity';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { NullableType } from 'src/utils/types/nullable.type';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { UUID } from 'src/utils/types/uuid';
import { ErrorResponse, OkResponse, OkResponseWithPagination, Response, ResponseWithPagination } from 'src/utils/response-helper';
@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Reviews')
@Controller({
  path: 'reviews',
  version: '1',
})
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,

    ) {}

  @SerializeOptions({
    groups: ['admin'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createReviewDto: CreateReviewDto): Promise<Response<Review>> {
    //get current user id

    return new OkResponse(await this.reviewsService.create(createReviewDto));
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryReviewDto,
  ): Promise<ResponseWithPagination<Review>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }
    const res = await this.reviewsService.findManyWithPagination({
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
  async findOne(@Param('id') id: UUID): Promise<Response<Review>> {
    const res = await this.reviewsService.findOne({ id: id });
    return res? new OkResponse(res) : new ErrorResponse('Review not found', HttpStatus.NOT_FOUND);
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Patch()
  @HttpCode(HttpStatus.OK)
  async update(
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<Response<Review>> {
    const res = await this.reviewsService.update(updateReviewDto);
    return res? new OkResponse(res) : new ErrorResponse('Review cannot update', HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: UUID): Promise<Response<string>> {
    await this.reviewsService.softDelete(id);
    return new OkResponse('Review deleted successfully');
  }
}
