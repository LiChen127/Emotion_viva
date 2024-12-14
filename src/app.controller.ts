import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MongoDBService } from './app/mongodb/mongodb.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mongoDBService: MongoDBService,
  ) { }

  @Get('users')
  async getUsers() {
    // return this.appService.getUsers();
    // this.mongoDBService.createCrawledData('test', { test: 'test' }, 'test');
    return this.mongoDBService.findAll();
  }
}
