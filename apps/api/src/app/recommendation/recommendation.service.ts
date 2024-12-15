@Injectable()
export class RecommendationService {
  constructor(
    private readonly contentRepo: ContentRepository,
    private readonly userRepo: UserRepository,
    private readonly cache: CacheService,
    private readonly analyzer: AnalyzerService,
  ) { }

  async getRecommendations(userId: string) {
    const cacheKey = `recommendations:${userId}`;

    return this.cache.getOrSet(cacheKey, async () => {
      const userProfile = await this.userRepo.getProfile(userId);
      const userInteractions = await this.analyzer.getUserInteractions(userId);

      // 调用推荐算法
      const recommendations = await this.calculateRecommendations(
        userProfile,
        userInteractions,
      );

      return recommendations;
    }, 3600); // 1小时缓存
  }
} 