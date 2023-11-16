import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../roles/entities/role.entity';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { Team } from '../entities/team.entity';
import { UUID } from 'src/utils/types/uuid';

export class FilterTeamDto {
  @ApiProperty()
  @IsOptional()
  name?: string | null;

  @ApiProperty()
  @IsOptional()
  users?: UUID[] | null; 

  @ApiProperty()
  @IsOptional()
  projects?: UUID[] | null;
}

export class SortTeamDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof Team;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryTeamDto {
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
    value ? plainToInstance(FilterTeamDto, JSON.parse(value)) : undefined,
  )
  @Type(() => FilterTeamDto)
  filters?: FilterTeamDto | null;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    console.log(JSON.parse(value));
    return value
      ? plainToInstance(SortTeamDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortTeamDto)
  sort?: SortTeamDto[] | null;
}
