import { Module } from '@nestjs/common';
import { RabbitMQCoreModule } from './core/rabbitmq.core.modules';
import { MessageRepository } from './repositories/message.respositories';

@Module({
  imports: [RabbitMQCoreModule],
  providers: [MessageRepository],
  exports: [MessageRepository],
})
export class RabbitMQModule { }
