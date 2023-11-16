import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';
import { UUID } from 'src/utils/types/uuid';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @ApiProperty()
  id: UUID;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
}
