import { Socket } from 'socket.io';

export interface ISocketWithDecoded extends Socket {
  decoded: {
    appUserId: string;
  };
}
