import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RabbitMQService {
  constructor(@Inject('RABBITMQ_CLIENT') private readonly client: ClientProxy) { }

  async publish<T>(pattern: string, data: T): Promise<void> {
    await lastValueFrom(this.client.emit(pattern, data));
  }

  subscribe<T>(pattern: string, callback: (data: T) => void): void {
    this.client.emit<T>(pattern, {}).subscribe(callback);
  }
}