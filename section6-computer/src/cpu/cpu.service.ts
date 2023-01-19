import { Injectable } from '@nestjs/common';
import { PowerService } from '../power/power.service';

@Injectable()
export class CpuService {
  private powerService: PowerService;

  constructor(powerGenerated: PowerService) {
    this.powerService = powerGenerated;
  }

  compute(a: number, b: number) {
    console.log(`CPU Service is computing function`);
    this.powerService.generateEnergy(15);
    return a * b;
  }
}
