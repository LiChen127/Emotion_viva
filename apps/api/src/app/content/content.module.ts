@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Content.name, schema: ContentSchema },
      { name: MediaResource.name, schema: MediaResourceSchema },
    ]),
    CoreKafkaModule,
    CoreRedisModule,
  ],
  controllers: [ContentController],
  providers: [
    ContentService,
    ContentRepository,
    {
      provide: 'CONTENT_ANALYZER',
      useClass: ContentAnalyzerService,
    },
  ],
})
export class ContentModule { } 