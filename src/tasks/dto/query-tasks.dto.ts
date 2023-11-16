import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../roles/entities/role.entity';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { Task } from '../entities/task.entity';
import { UUID } from 'src/utils/types/uuid';

export class FilterTaskDto {
  @ApiProperty()
  @IsOptional()
  name?: string | null;

  @ApiProperty()
  @IsOptional()
  users?: UUID[] | null; 

  @ApiProperty()
  @IsOptional()
  project?: UUID | null;
}

export class SortTaskDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof Task;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryTaskDto {
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
    value ? plainToInstance(FilterTaskDto, JSON.parse(value)) : undefined,
  )
  @Type(() => FilterTaskDto)
  filters?: FilterTaskDto | null;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    console.log(JSON.parse(value));
    return value
      ? plainToInstance(SortTaskDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortTaskDto)
  sort?: SortTaskDto[] | null;
}
