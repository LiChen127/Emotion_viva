import { ClientProxy } from '@nestjs/microservices';
import { RabbitMQService } from '../rabbitmq.service';
export declare class MessageRepository {
    private readonly client;
    private readonly rabbitmqService;
    constructor(client: ClientProxy, rabbitmqService: RabbitMQService);
    publish<T>(pattern: string, data: T): Promise<void>;
    send<T, R>(pattern: string, data: T): Promise<R>;
    close(): Promise<void>;
    emit<T>(pattern: string, data: T): Promise<void>;
    subscribe(pattern: string, callback: (data: any) => void): void;
}
