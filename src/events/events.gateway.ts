import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { GpioService } from 'src/gpio/gpio.service';

@WebSocketGateway({
  cors: {
    origin: '*', // настрой, если нужно
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly gpioService: GpioService) {}

  // обработка входящего сообщения
  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): void {
    console.log('Received message:', data);

    // отправка сообщения обратно всем
    // this.server.emit('message', `Echo: ${data}`);
    this.gpioService.motionSensorState$.subscribe((state) => {
      console.log(`Motion sensor state: ${state}`);
      this.server.emit('motionSensorState', state);
    });
  }

  // подключение клиента
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  // отключение клиента
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }
}
