// src/events/events.gateway.ts
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GpioService } from 'src/gpio/gpio.service';
import { Subscription } from 'rxjs'; // Import Subscription
import { OnModuleInit } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*', // Adjust as needed for your frontend
  },
})
export class EventsGateway implements OnModuleInit {
  // Implement OnModuleInit
  @WebSocketServer()
  server: Server;

  private motionSubscription: Subscription; // To hold our subscription

  constructor(private readonly gpioService: GpioService) {}

  // This method is called once the module has been initialized
  onModuleInit() {
    // Subscribe to the motionSensorState$ Observable from GpioService
    this.motionSubscription = this.gpioService.motionSensorState$.subscribe(
      (isMotionDetected: number) => {
        console.log('Motion sensor state changed:', isMotionDetected);
        // Emit the event to all connected clients
        this.server.emit('motionSensorState', isMotionDetected);
      },
    );
  }

  // Disconnect subscription when the gateway is destroyed to prevent memory leaks
  onModuleDestroy() {
    if (this.motionSubscription) {
      this.motionSubscription.unsubscribe();
    }
  }

  // --- Existing Methods ---

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): void {
    console.log('Received message:', data);
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }
}
