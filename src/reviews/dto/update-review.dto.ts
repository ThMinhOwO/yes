import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateReviewDto } from './create-review.dto';
import { UUID } from 'src/utils/types/uuid';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
  @ApiProperty()
  @IsNotEmpty()
  id: UUID;

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
  attachment?: string | undefined;

  @ApiProperty()
  @IsOptional()
  status?: UUID;


}
