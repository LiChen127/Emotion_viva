import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseCoreModule } from './core/database.core.module.js';
import { User } from './entities/User.entity';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [DatabaseCoreModule, TypeOrmModule.forFeature([User])],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class MySQLModule { }
