import { Module } from '@nestjs/common';
import { CrawlerSchedulerService } from './services/crawler.scheduler.service';

@Module({
  controllers: [],
  providers: [CrawlerSchedulerService],
})
export class SchedulerModule {}
