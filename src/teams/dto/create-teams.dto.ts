import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { UUID } from 'src/utils/types/uuid';

export class CreateTeamDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

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
  projects?: UUID[];
}
