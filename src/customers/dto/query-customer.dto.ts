import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { Customer } from '../entities/customer.entity';
import { UUID } from 'src/utils/types/uuid';

export class FilterCustomerDto {
  @ApiProperty()
  @IsOptional()
  firstName?: string;

  @ApiProperty()
  @IsOptional()
  lastName?: string;

  @ApiProperty()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsOptional()
  phone?: string;

  @ApiProperty()
  @IsOptional()
  address?: string;

  @ApiProperty()
  @IsOptional()
  city?: string;

  @ApiProperty()
  @IsOptional()
  country?: string;

  @ApiProperty()
  @IsOptional()
  avatar?: string;
  

}

export class SortCustomerDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof Customer;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryCustomerDto {
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
    value ? plainToInstance(FilterCustomerDto, JSON.parse(value)) : undefined,
  )
  @Type(() => FilterCustomerDto)
  filters?: FilterCustomerDto | null;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    console.log(JSON.parse(value));
    return value
      ? plainToInstance(SortCustomerDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortCustomerDto)
  sort?: SortCustomerDto[] | null;
}
