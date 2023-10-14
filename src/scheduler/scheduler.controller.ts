import { Controller } from '@nestjs/common';
import { CrawlerSchedulerService } from './services/crawler.scheduler.service';

@Controller('scheduler')
export class SchedulerController {
  constructor(private readonly schedulerService: CrawlerSchedulerService) {}
}
