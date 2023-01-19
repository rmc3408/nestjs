import { Injectable } from '@nestjs/common';
import { PowerService } from '../power/power.service';

@Injectable()
export class DiskService {
  private powerService: PowerService;

  constructor(powerGenerated: PowerService) {
    this.powerService = powerGenerated;
  }

  getData() {
    console.log('Disk Service uses getData Function');
    this.powerService.generateEnergy(20);
    return 'data collected';
  }
}
