import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../roles/entities/role.entity';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { Project } from '../entities/project.entity';

export class FilterProjectDto {
  @ApiProperty({ type: Role })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Role)
  roles?: Role[] | null;
}

export class SortProjectDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof Project;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryProjectDto {
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

  // @ApiProperty({ type: String, required: false })
  // @IsOptional()
  // @Transform(({ value }) =>
  //   value ? plainToInstance(FilterUserDto, JSON.parse(value)) : undefined,
  // )
  // // @ValidateNested()
  // // @Type(() => FilterUserDto)
  // // filters?: FilterUserDto | null;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    console.log(JSON.parse(value));
    return value
      ? plainToInstance(SortProjectDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortProjectDto)
  sort?: SortProjectDto[] | null;
}
