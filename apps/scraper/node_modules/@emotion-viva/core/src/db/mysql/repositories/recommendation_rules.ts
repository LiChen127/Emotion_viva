import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecommendationRules } from '../entities/Recommendation_rules.entity';

@Injectable()
export class RecommendationRulesRepository {
  constructor(
    @InjectRepository(RecommendationRules)
    private readonly repository: Repository<RecommendationRules>,
  ) { }
}
