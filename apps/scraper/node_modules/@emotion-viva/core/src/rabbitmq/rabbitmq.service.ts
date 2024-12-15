import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  constructor(private readonly client: ClientProxy) { }

  async publish<T>(pattern: string, data: T): Promise<void> {
    await this.client.emit(pattern, data).toPromise();
  }

  subscribe<T>(pattern: string, callback: (data: T) => void): void {
    this.client.emit<T>(pattern, {}).subscribe(callback);
  }
}