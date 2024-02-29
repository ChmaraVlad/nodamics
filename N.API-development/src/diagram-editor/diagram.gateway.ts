import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { UpdateDiagramElementsDto } from './dto';
import * as process from 'process';
import { EDiagramEventDiagramServer, EEventDiagramWeb } from '../constants';
import { DiagramService } from '../diagram';
import { DiagramEditorService } from './diagram-editor.service';
import { AppSocketGetaway, ISocketWithDecoded } from '../socket';

@WebSocketGateway({
  namespace: 'diagram',
  path: '/socket',
  cors: {
    origin: process.env.WEBSITE_DOMAIN,
    credentials: true,
  },
  maxHttpBufferSize: 500 * 1024 * 1024,
})
export class DiagramGateway extends AppSocketGetaway {
  constructor(
    private readonly diagramService: DiagramService,
    private readonly diagramEditorService: DiagramEditorService,
  ) {
    super();
  }

  @SubscribeMessage(EDiagramEventDiagramServer.JoinDiagramRoom)
  async joinDiagramRoom(
    @MessageBody() diagramId: string,
    @ConnectedSocket() socket: ISocketWithDecoded,
  ) {
    console.log('joinDiagramRoom', diagramId);
    if (typeof diagramId === 'string') {
      await this.socketRoomService.joinRoom(socket, `diagram_${diagramId}`);
    }
  }

  @SubscribeMessage(EDiagramEventDiagramServer.RequestDiagram)
  async requestDiagram(@MessageBody() diagramId: string) {
    if (typeof diagramId === 'string') {
      console.log('requestDiagram', diagramId);
      const diagram = await this.diagramService.getDiagramById(diagramId);
      await this.socketRoomService.emitToRoom(
        `diagram_${diagramId}`,
        EEventDiagramWeb.UpdateDiagramElements,
        diagram,
      );
    }
  }

  @SubscribeMessage(EDiagramEventDiagramServer.UpdateDiagramElements)
  async updateDiagramElements(
    @MessageBody() data: UpdateDiagramElementsDto,
    @ConnectedSocket() socket: ISocketWithDecoded,
  ) {
    await this.diagramEditorService.updateDiagramElementsById({
      diagramId: data.diagramId,
      elements: data.elements,
      userId: socket.decoded.appUserId,
    });
  }
}
