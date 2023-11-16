import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

export class CreateChatDto {}

export class CreateRoomDto {
    @ApiProperty()
    @IsOptional()
    title?: string;
    
    @ApiProperty()
    @IsOptional()
    description?: string;

    @ApiProperty()
    @IsNotEmpty()
    userId: UUID;

    @ApiProperty()
    @IsNotEmpty()
    users: UUID[];
}

export class CreateMessageDto {
    @ApiProperty()
    @IsNotEmpty()
    message: string;

    @ApiProperty()
    @IsOptional()
    attachment?: string;

    @ApiProperty()
    @IsNotEmpty()
    roomId: UUID;

    @ApiProperty()
    @IsNotEmpty()
    userId: UUID;
}