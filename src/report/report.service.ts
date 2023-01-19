import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportEntity } from './report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { UserEntity } from 'src/user/user.entity';
import { GetEstimateDto } from './dto/get-estimate.dto';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(ReportEntity) private repo: Repository<ReportEntity>,
  ) {}

  async create(report: CreateReportDto, user: UserEntity) {
    report.user = user;
    const newReport = await this.repo.create(report);
    return this.repo.save(newReport);
  }

  async update(id: string, aproved: boolean) {
    if (isNaN(+id))
      throw new NotAcceptableException('Id must be a valid number');
    const foundReport = await this.repo.findOneBy({ id: parseInt(id) });
    if (!foundReport) throw new NotFoundException('Report not found');

    foundReport.isAproved = aproved;
    return this.repo.save(foundReport);
  }

  async createEstimate(query: GetEstimateDto) {
    return this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      //.select('*')
      .where('make = :make', { make: query.make })
      .andWhere('model = :model', { model: query.model })
      .andWhere('longitude = :longitude BETWEEN -5 AND 5', { longitude: query.longitude })
      .andWhere('year - :year BETWEEN -20 AND 20', { year: query.year })
      .andWhere('isAproved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage: query.mileage })
      .limit(3)
      .getRawMany();
  }
}
