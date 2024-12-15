import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ScraperService } from './scraper.service';
import { ScraperTaskDto } from '@/app/task/scraper/dto/scraper-task.dto';

@Controller()
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) { }

  @MessagePattern('scraper.submit')
  async submitTask(@Payload() task: ScraperTaskDto) {
    return this.scraperService.submitTask(task);
  }

  @MessagePattern('scraper.status')
  async getTaskStatus(@Payload() data: { taskId: string }) {
    return this.scraperService.getTaskStatus(data.taskId);
  }

  @MessagePattern('scraper.cancel')
  async cancelTask(@Payload() data: { taskId: string }) {
    return this.scraperService.cancelTask(data.taskId);
  }
} 