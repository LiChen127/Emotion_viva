@Injectable()
export class TaskService {
  constructor(
    private readonly taskManager: TaskManagerService,
    private readonly workerPool: WorkerPoolService,
    @Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientKafka,
  ) { }

  async handleTask(task: ScraperTask) {
    try {
      const worker = await this.workerPool.getAvailableWorker();
      const result = await worker.execute(task);

      // 发送结果到Kafka
      await this.kafkaClient.emit('scraper.result', {
        taskId: task.id,
        result,
        timestamp: new Date(),
      });

      return result;
    } catch (error) {
      // 错误处理和重试逻辑
    }
  }
} 