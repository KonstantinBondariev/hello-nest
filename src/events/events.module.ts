import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { GpioModule } from 'src/gpio/gpio.module';

@Module({
  providers: [EventsGateway],
  imports: [GpioModule],
})
export class EventsModule {}
