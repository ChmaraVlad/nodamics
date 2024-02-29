import * as process from 'process';
import { AppSocketGetaway, ISocketWithDecoded } from '../socket';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import {
  EFootprintSocketEventEmit,
  EFootprintSocketEventOn,
} from '../constants';
import { FootprintManagerService } from './footprint-manager.service';
import { QueryFootprintSqlQueriesDto } from './dto';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  namespace: 'footprint',
  path: '/socket',
  cors: {
    origin: process.env.WEBSITE_DOMAIN,
    credentials: true,
  },
  maxHttpBufferSize: 500 * 1024 * 1024,
})
export class FootprintManagerGateway extends AppSocketGetaway {
  logger = new Logger(FootprintManagerGateway.name);
  constructor(
    private readonly footprintManagerService: FootprintManagerService,
  ) {
    super();
  }

  @SubscribeMessage(EFootprintSocketEventOn.JoinFootprintRoom)
  async joinDiagramRoom(
    @MessageBody() diagramId: string,
    @ConnectedSocket() socket: ISocketWithDecoded,
  ) {
    this.logger.log('join foot print room');
    if (typeof diagramId === 'string') {
      const roomName = this.generateFootprintRoomName(diagramId);
      await this.socketRoomService.joinRoom(socket, roomName);
    } else {
      console.error('diagramId is not string');
    }
  }

  @SubscribeMessage(EFootprintSocketEventOn.RequestFootprint)
  async requestDiagram(@MessageBody() diagramId: string) {
    const roomName = this.generateFootprintRoomName(diagramId);
    const footprintQueries =
      await this.footprintManagerService.getFootprintQueries(
        new QueryFootprintSqlQueriesDto({}),
      );
    this.socketRoomService.emitToRoom(
      roomName,
      EFootprintSocketEventEmit.UPDATE_FOOTPRINT,
      footprintQueries,
    );
  }

  private generateFootprintRoomName(diagramId: string) {
    return `footprint_${diagramId}`;
  }
}
