export const QUEUE_CONFIG = {
  mainQueue: {
    name: 'main_queue',
    options: {
      durable: true,
      deadLetterExchange: 'dlx',
      deadLetterRoutingKey: 'dlq',
      messageTtl: 1000 * 60 * 60, // 1 hour
    },
  },
  // 可以添加更多队列配置
};

export const EXCHANGE_CONFIG = {
  main: {
    name: 'main_exchange',
    type: 'topic',
  },
  dlx: {
    name: 'dlx',
    type: 'direct',
  },
};
