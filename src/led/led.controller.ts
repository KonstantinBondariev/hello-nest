import { Controller, Get } from '@nestjs/common';
import { LedService } from './led.service';

@Controller('led')
export class LedController {
  constructor(private readonly ledService: LedService) {}

  @Get('on')
  turnOnLed(): string {
    this.ledService.turnOnLed();
    return 'LED is turned on';
  }

  @Get('off')
  turnOffLed(): string {
    this.ledService.turnOffLed();
    return 'LED is turned off';
  }

  @Get('state')
  getLedState(): number {
    return this.ledService.getLedState();
  }
}
