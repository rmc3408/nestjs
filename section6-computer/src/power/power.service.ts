import { Injectable } from '@nestjs/common';

@Injectable()
export class PowerService {
  generateEnergy(watts: number) {
    console.log(`PowerService - Supplying ${watts} watts of energy`)
  }
}
