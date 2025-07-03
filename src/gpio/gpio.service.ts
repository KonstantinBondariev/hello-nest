import { Injectable } from '@nestjs/common';
import { Gpio } from 'pigpio';

@Injectable()
export class GpioService {
  private readonly gpo17: Gpio;
  // private readonly gpo17: any;

  constructor() {
    this.gpo17 = new Gpio(17, { mode: Gpio.OUTPUT });
    // this.gpo17 = {
    //   digitalWrite: (state: 1 | 0) => {
    //     console.log(`GPIO 17 set to ${state}`);
    //   },
    //   digitalRead: () => {
    //     return 0;
    //   },
    // };
  }

  setGpo17State(state: 1 | 0): void {
    this.gpo17.digitalWrite(state);
  }

  getGpo17State(): number {
    return this.gpo17.digitalRead();
  }

  onModuleDestroy() {
    this.gpo17.digitalWrite(0);
  }
}
