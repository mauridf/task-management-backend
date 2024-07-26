import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
  } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { Subtask } from './subtask.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Post()
  create(@Body() task: Partial<Task>): Promise<Task> {
    return this.tasksService.createTask(task);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() task: Partial<Task>): Promise<Task> {
    return this.tasksService.updateTask(id, task);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Post(':taskId/subtasks')
  createSubtask(@Param('taskId') taskId: number, @Body() subtask: Partial<Subtask>): Promise<Subtask> {
    return this.tasksService.createSubtask(taskId, subtask);
  }

  @Put('subtasks/:id')
  updateSubtask(@Param('id') id: number, @Body() subtask: Partial<Subtask>): Promise<Subtask> {
    return this.tasksService.updateSubtask(id, subtask);
  }

  @Delete('subtasks/:id')
  deleteSubtask(@Param('id') id: number): Promise<void> {
    return this.tasksService.deleteSubtask(id);
  }
}
