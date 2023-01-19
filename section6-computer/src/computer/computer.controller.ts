import { Controller, Get } from '@nestjs/common';
import { CpuService } from '../cpu/cpu.service';
import { DiskService } from '../disk/disk.service';

@Controller('computer')
export class ComputerController {
  private cpu: CpuService;
  private disk: DiskService;

  constructor(cpuService: CpuService, diskService: DiskService) {
    this.cpu = cpuService;
    this.disk = diskService;
  }

  @Get()
  run() {
    console.log('Computer is running function');
    const resultCPU = this.cpu.compute(30, 20);
    const resultDisk = this.disk.getData();
    console.log(`Computer got ${resultCPU} core CPU Mhz and -> ${resultDisk} value`);
  }
}
