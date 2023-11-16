import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { DeepPartial, FindOptionsWhere, Like, Repository } from 'typeorm';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { FilterReviewDto, SortReviewDto } from './dto/query-review.dto';
import {UsersService} from '../users/users.service';
@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}
  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    return this.reviewRepository.save(
      this.reviewRepository.create(createReviewDto),
    );
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterReviewDto | null;
    sortOptions?: SortReviewDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Review[]> {
    const where: FindOptionsWhere<Review> = {};
    if (filterOptions?.title) {
      where.title = Like(`%${filterOptions.title}%`);
    }
    if(filterOptions?.description){
      where.description = Like(`%${filterOptions.description}%`);
    }
    if(filterOptions?.objectId && filterOptions?.objectType){
      where.objectId = filterOptions.objectId;
      where.objectType = filterOptions.objectType;
    }
    return this.reviewRepository.find({
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

  findOne(fields: EntityCondition<Review>): Promise<NullableType<Review>> {
    return this.reviewRepository.findOne({
      where: fields,
    });
  }

  update(payload: DeepPartial<Review>): Promise<Review> {
    return this.reviewRepository.save(
      this.reviewRepository.create({
        ...payload,
      }),
    );
  }

  async softDelete(id: Review['id']): Promise<void> {
    await this.reviewRepository.softDelete(id);
  }
}
