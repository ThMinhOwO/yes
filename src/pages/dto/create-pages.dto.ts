import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { UUID } from 'src/utils/types/uuid';

export class CreatePageDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsOptional()
  path?: string;

  @ApiProperty()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsOptional()
  icon?: string;

  @ApiProperty()
  @IsOptional()
  order?: number;

  @ApiProperty()
  @IsOptional()
  parent?: UUID;
  
}
