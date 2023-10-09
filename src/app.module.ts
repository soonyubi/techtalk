import { Module } from '@nestjs/common';
import { AppController } from './AppController';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
