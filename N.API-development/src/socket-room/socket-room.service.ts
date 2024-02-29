import { Injectable } from '@nestjs/common';
import { Socket, Namespace } from 'socket.io';

@Injectable()
export class SocketRoomService {
  private rooms: Map<string, Set<Socket>> = new Map<string, Set<Socket>>();
  private namespace: Namespace;
  initialize(instance: Namespace) {
    if (instance instanceof Namespace) {
      this.namespace = instance;
    } else {
      console.error('server is not instance of Namespace');
    }
    console.log(
      'SocketRoomService initialized with namespace:',
      this.namespace.name,
    );
  }

  get sww() {
    console.log('this.namespace.name', this.namespace.name);
    return this.namespace.server.of(this.namespace.name);
  }

  async joinRoom(client: Socket, roomName: string) {
    await client.join(roomName);

    if (!this.rooms.has(roomName)) {
      this.rooms.set(roomName, new Set<Socket>());
    }
    this.rooms.get(roomName).add(client);
  }

  async leaveRoom(client: Socket, roomName: string) {
    await client.leave(roomName);

    if (this.rooms.has(roomName)) {
      const clients = this.rooms.get(roomName);
      clients.delete(client);
      if (clients.size === 0) {
        this.rooms.delete(roomName);
      }
    }
  }

  emitToRoom(roomName: string, event: string, data: any) {
    this.sww.to(roomName).emit(event, data);
  }
}
