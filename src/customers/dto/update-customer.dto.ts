import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCustomerDto } from './create-customer.dto';
import { UUID } from 'src/utils/types/uuid';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @ApiProperty()
  @IsNotEmpty()
  id: UUID;

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

  @ApiProperty()
  @IsOptional()
  users?: UUID[];

  @ApiProperty()
  @IsOptional()
  projects?: UUID[];

  @ApiProperty()
  @IsOptional()
  tickets?: UUID[];
}
