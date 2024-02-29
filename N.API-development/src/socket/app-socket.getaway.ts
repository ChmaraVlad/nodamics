import { OnGatewayConnection, WebSocketServer } from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
import { SocketRoomService } from '../socket-room';
import * as jwt from 'jsonwebtoken';
import { ISocketWithDecoded } from './interface';

export abstract class AppSocketGetaway implements OnGatewayConnection<Socket> {
  @WebSocketServer()
  namespace: Namespace;
  protected readonly socketRoomService: SocketRoomService;
  constructor() {
    this.socketRoomService = new SocketRoomService();
  }

  afterInit() {
    this.socketRoomService.initialize(this.namespace);
  }

  handleConnection(socket: ISocketWithDecoded) {
    console.log('handleConnection');
    const token: string = socket.handshake.query.token as string;
    const decoded: any = jwt.decode(token);
    socket.decoded = decoded;
  }
}
