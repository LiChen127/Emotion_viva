export declare const infrastructureConfig: (() => {
    mysql: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        pool: {
            max: number;
        };
    };
    mongodb: {
        uri: string;
        options: {
            useNewUrlParser: boolean;
            useUnifiedTopology: boolean;
            maxPoolSize: number;
        };
    };
    redis: {
        host: string;
        port: number;
        password: string;
        db: number;
        cluster: {
            nodes: string[];
        };
    };
    rabbitmq: {
        uri: string;
        queues: {
            main: {
                name: string;
                options: {
                    durable: boolean;
                    deadLetterExchange: string;
                };
            };
            scraper: {
                name: string;
                options: {
                    durable: boolean;
                    deadLetterExchange: string;
                };
            };
        };
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    mysql: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        pool: {
            max: number;
        };
    };
    mongodb: {
        uri: string;
        options: {
            useNewUrlParser: boolean;
            useUnifiedTopology: boolean;
            maxPoolSize: number;
        };
    };
    redis: {
        host: string;
        port: number;
        password: string;
        db: number;
        cluster: {
            nodes: string[];
        };
    };
    rabbitmq: {
        uri: string;
        queues: {
            main: {
                name: string;
                options: {
                    durable: boolean;
                    deadLetterExchange: string;
                };
            };
            scraper: {
                name: string;
                options: {
                    durable: boolean;
                    deadLetterExchange: string;
                };
            };
        };
    };
}>;
