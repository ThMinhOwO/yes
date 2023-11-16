import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePageDto } from './create-pages.dto';
import { UUID } from 'src/utils/types/uuid';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdatePageDto extends PartialType(CreatePageDto) {
  @ApiProperty()
  @IsNotEmpty()
  id: UUID;

  @ApiProperty()
  @IsNotEmpty()
  name?: string;

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
