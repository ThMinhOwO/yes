import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-tasks.dto';
import { UUID } from 'src/utils/types/uuid';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty()
  @IsNotEmpty()
  id: UUID;

  @ApiProperty()
  @IsNotEmpty()
  name?: string;

  @ApiProperty()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsOptional()
  status?: UUID;

  @ApiProperty()
  @IsOptional()
  users?: UUID[];

  @ApiProperty()
  @IsOptional()
  project?: UUID;
  


}
