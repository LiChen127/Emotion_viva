export declare const QUEUE_CONFIG: {
    mainQueue: {
        name: string;
        options: {
            durable: boolean;
            deadLetterExchange: string;
            deadLetterRoutingKey: string;
            messageTtl: number;
        };
    };
};
export declare const EXCHANGE_CONFIG: {
    main: {
        name: string;
        type: string;
    };
    dlx: {
        name: string;
        type: string;
    };
};
