import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { UUID } from 'src/utils/types/uuid';

export class CreateTicketDto {
  @ApiProperty()
  @IsNotEmpty()
  title?: string;

  @ApiProperty()
  @IsOptional()
  description?: string;
  
  @ApiProperty()
  @IsOptional()
  attachment?: string;

  @ApiProperty()
  @IsOptional()
  status?: string;

  @ApiProperty()
  @IsOptional()
  customerId?: UUID;
}
