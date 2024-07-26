import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './task.entity';
import { Subtask } from './subtask.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Subtask])],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
