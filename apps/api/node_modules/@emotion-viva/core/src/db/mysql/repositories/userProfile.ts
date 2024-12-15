import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from '../entities/UserProfile.entity';

@Injectable()
export class UserProfileRepository {
  constructor(
    @InjectRepository(UserProfile)
    private readonly repository: Repository<UserProfile>,
  ) { }
}
