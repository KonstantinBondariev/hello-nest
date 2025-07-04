import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GpioModule } from './gpio/gpio.module';
import { LedModule } from './led/led.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [GpioModule, LedModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
