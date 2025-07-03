import { Module } from '@nestjs/common';
import { LedService } from './led.service';
import { LedController } from './led.controller';
import { GpioModule } from 'src/gpio/gpio.module';

@Module({
  imports: [GpioModule],
  providers: [LedService],
  controllers: [LedController],
})
export class LedModule {}
