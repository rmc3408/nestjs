import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportEntity } from './report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class ReportService {
  constructor(@InjectRepository(ReportEntity) private repo: Repository<ReportEntity>) {}
  
  async create(report: CreateReportDto, user: UserEntity) {
    report.user = user;
    const newReport = await this.repo.create(report);
    return this.repo.save(newReport);
  }
}
