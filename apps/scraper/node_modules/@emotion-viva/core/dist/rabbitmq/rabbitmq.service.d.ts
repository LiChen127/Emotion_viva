import { ClientProxy } from '@nestjs/microservices';
export declare class RabbitMQService {
    private readonly client;
    constructor(client: ClientProxy);
    publish<T>(pattern: string, data: T): Promise<void>;
    subscribe<T>(pattern: string, callback: (data: T) => void): void;
}
