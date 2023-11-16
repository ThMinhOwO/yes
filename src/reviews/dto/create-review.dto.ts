import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { UUID } from 'src/utils/types/uuid';

export class CreateReviewDto {
  @ApiProperty()
  @IsNotEmpty()
  objectId: UUID;

  @ApiProperty()
  @IsNotEmpty()
  objectType: UUID;

  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsOptional()
  status?: UUID;
}
