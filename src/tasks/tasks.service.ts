import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from './task.entity';
import { Subtask, SubtaskStatus } from './subtask.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(Subtask)
    private subtasksRepository: Repository<Subtask>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.tasksRepository.find({ relations: ['subtasks'] });
  }

  async findOne(id: number): Promise<Task> {
    return this.tasksRepository.findOne({ where: { id }, relations: ['subtasks'] });
  }

  async createTask(task: Partial<Task>): Promise<Task> {
    const newTask = this.tasksRepository.create(task);
    await this.tasksRepository.save(newTask);
    return newTask;
  }

  async updateTask(id: number, task: Partial<Task>): Promise<Task> {
    await this.tasksRepository.update(id, task);
    return this.findOne(id);
  }

  async deleteTask(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }

  // Métodos para subtarefas
  async createSubtask(taskId: number, subtask: Partial<Subtask>): Promise<Subtask> {
    const task = await this.findOne(taskId);
    const newSubtask = this.subtasksRepository.create({ ...subtask, task });
    await this.subtasksRepository.save(newSubtask);
    return newSubtask;
  }

  async updateSubtask(id: number, subtask: Partial<Subtask>): Promise<Subtask> {
    await this.subtasksRepository.update(id, subtask);
    return this.subtasksRepository.findOneBy({ id });
  }

  async deleteSubtask(id: number): Promise<void> {
    await this.subtasksRepository.delete(id);
  }
}
