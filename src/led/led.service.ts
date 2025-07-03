import { Injectable } from '@nestjs/common';
import { GpioService } from 'src/gpio/gpio.service';

@Injectable()
export class LedService {
  constructor(private readonly gpioService: GpioService) {}

  turnOnLed(): void {
    this.gpioService.setGpo17State(1);
  }

  turnOffLed(): void {
    this.gpioService.setGpo17State(0);
  }

  getLedState(): number {
    return this.gpioService.getGpo17State();
  }
}
