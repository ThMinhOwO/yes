import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { Review } from '../entities/review.entity';
import { UUID } from 'src/utils/types/uuid';

export class FilterReviewDto {
  @ApiProperty()
  @IsOptional()
  objectId?: UUID | null;

  @ApiProperty()
  @IsOptional()
  objectType?: UUID | null;

  @ApiProperty()
  @IsOptional()
  title?: string | null;

  @ApiProperty()
  @IsOptional()
  description?: string | null;

}

export class SortReviewDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof Review;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryReviewDto {
  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page: number;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit: number;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(FilterReviewDto, JSON.parse(value)) : undefined,
  )
  @Type(() => FilterReviewDto)
  filters?: FilterReviewDto | null;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    console.log(JSON.parse(value));
    return value
      ? plainToInstance(SortReviewDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortReviewDto)
  sort?: SortReviewDto[] | null;
}
