import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../roles/entities/role.entity';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { Page } from '../entities/page.entity';
import { UUID } from 'src/utils/types/uuid';

export class FilterPageDto {
  @ApiProperty()
  @IsOptional()
  name?: string | null;

  @ApiProperty()
  @IsOptional()
  path?: string | null;

  @ApiProperty()
  @IsOptional()
  description?: string | null;

  @ApiProperty()
  @IsOptional()
  icon?: string | null;

  @ApiProperty()
  @IsOptional()
  order?: number | null;

  @ApiProperty()
  @IsOptional()
  parent?: UUID | null;
  
}

export class SortPageDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof Page;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryPageDto {
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
    value ? plainToInstance(FilterPageDto, JSON.parse(value)) : undefined,
  )
  @Type(() => FilterPageDto)
  filters?: FilterPageDto | null;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    console.log(JSON.parse(value));
    return value
      ? plainToInstance(SortPageDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortPageDto)
  sort?: SortPageDto[] | null;
}
