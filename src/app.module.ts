import { Module, ValidationPipe } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [AuthModule, PrismaModule, UserModule, TaskModule],
  providers: [{
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      whitelist: true
    })
  }]
})
export class AppModule { }
