import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GpioModule } from './gpio/gpio.module';
import { LedModule } from './led/led.module';

@Module({
  imports: [GpioModule, LedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
