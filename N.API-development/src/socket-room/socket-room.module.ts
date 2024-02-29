import { Module } from '@nestjs/common';
import { SocketRoomService } from './socket-room.service';

@Module({
  providers: [SocketRoomService],
  exports: [SocketRoomService],
})
export class SocketRoomModule {}
