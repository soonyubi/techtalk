import { Injectable } from '@nestjs/common';
import { GangnamUnniCrawlingStrategy } from './strategies/gangnam-unni.crawling.strategy';
import { CrawlingStrategy } from './strategies/crawling.strategy.interface';

@Injectable()
export class CrawlerSchedulerService {
  private readonly crawlingStrategy: CrawlingStrategy;
  constructor(crawlingStrategy: CrawlingStrategy) {
    this.crawlingStrategy = crawlingStrategy;
  }

  doSomethingCrawling(): void {
    // todo : 1. retrieve techblog data from database
    // todo : 2. extract strategy from techblog data
    // todo : 3. get crawling strategy from 2
    // todo : 4. excute crawling strategy
  }
}
