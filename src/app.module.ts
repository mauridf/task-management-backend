import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { Task } from './tasks/task.entity';
import { Subtask } from './tasks/subtask.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Mt190720@',
      database: 'taskmanagement',
      entities: [Task, Subtask],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Task, Subtask]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class AppModule {}
