import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTeamDto } from './create-teams.dto';
import { UUID } from 'src/utils/types/uuid';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateTeamDto extends PartialType(CreateTeamDto) {
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
  project?: UUID[];
  


}
