export declare const databaseConfig: (() => {
    mysql: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
    };
    mongodb: {
        uri: string;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    mysql: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
    };
    mongodb: {
        uri: string;
    };
}>;
export declare const cacheConfig: (() => {
    redis: {
        host: string;
        port: number;
        password: string;
        db: number;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    redis: {
        host: string;
        port: number;
        password: string;
        db: number;
    };
}>;
export declare const queueConfig: (() => {
    rabbitmq: {
        uri: string;
        queues: {
            main: string;
            scraper: string;
        };
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    rabbitmq: {
        uri: string;
        queues: {
            main: string;
            scraper: string;
        };
    };
}>;
