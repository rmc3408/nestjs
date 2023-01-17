import {
  Controller,
  Body,
  Post,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { customResponseSerializer } from 'src/decorator/serializer.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { UserEntity } from 'src/user/user.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { SerializedReportDto } from './dto/serialize-report.dto';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Post() // Request by method POST
  @UseGuards(AuthGuard) // Request guard by checking user is logged (boolean)
  @customResponseSerializer(SerializedReportDto)
  async createReport(
    @Body(new ValidationPipe({ whitelist: true })) body: CreateReportDto,
    @CurrentUser() user: UserEntity,
  ) {
    const data = await this.reportService.create(body, user);
    return data;
  }
}
