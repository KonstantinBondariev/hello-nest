import { Injectable } from '@nestjs/common';
import { Gpio } from 'pigpio';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class GpioService {
  // private readonly gpo17: Gpio;
  private readonly gpo17: any;
  // private readonly gpi27:any
  private readonly gpi27: Gpio;

  motionSensorState$ = new BehaviorSubject<number>(0);

  constructor() {
    // this.gpo17 = new Gpio(17, { mode: Gpio.OUTPUT });
    this.gpo17 = {
      digitalWrite: (state: 1 | 0) => {
        console.log(`GPIO 17 set to ${state}`);
      },
      digitalRead: () => {
        return 0;
      },
    };
    this.gpi27 = new Gpio(27, { mode: Gpio.INPUT, alert: true });
    this.listen27();
  }

  private listen27(): void {
    this.gpi27.on('alert', (level, tick) => {
      // level will be 0 for low and 1 for high
      // tick is the timestamp of the state change in microseconds
      console.log(
        `Пин GPIO 27 изменил состояние: ${level === 1 ? 'HIGH' : 'LOW'} (Время: ${tick} мкс)`,
      );

      // Your logic here based on the pin state
      if (level === 0) {
        this.motionSensorState$.next(0);
      } else {
        this.motionSensorState$.next(1);
      }
    });
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
