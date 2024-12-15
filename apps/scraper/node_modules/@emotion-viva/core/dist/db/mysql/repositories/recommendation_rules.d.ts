import { Repository } from 'typeorm';
import { RecommendationRules } from '../entities/Recommendation_rules.entity';
export declare class RecommendationRulesRepository {
    private readonly repository;
    constructor(repository: Repository<RecommendationRules>);
}
