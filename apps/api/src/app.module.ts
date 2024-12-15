import { Module } from '@nestjs/common';
import { CoreModule } from '@emotion-viva/core';
import { UserModule } from './user/user.module';
import { ContentModule } from './content/content.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    CoreModule,
    UserModule,
    ContentModule,
    TaskModule,
  ],
})
export class AppModule { } 