import { Module } from '@nestjs/common';
import { RabbitMQCoreModule } from './core/rabbitmq.core.modules';
import { MessageRepository } from './repositories/message.repositories';
import { RabbitMQService } from './rabbitmq.service';

@Module({
  imports: [RabbitMQCoreModule],
  providers: [MessageRepository, RabbitMQService],
  exports: [MessageRepository, RabbitMQService],
})
export class RabbitMQModule { }
