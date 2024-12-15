import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySQLCoreModule } from './core/mysql.core.module';
import { User } from './entities/User.entity';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [MySQLCoreModule, TypeOrmModule.forFeature([User])],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class MySQLModule { }
