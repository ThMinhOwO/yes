import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Message } from './entities/message.entity';
import { RoomToUser } from './entities/room-to-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Message, RoomToUser])],
  providers: [ChatGateway, ChatService],
  exports: [ChatService],
})
export class ChatModule {}
