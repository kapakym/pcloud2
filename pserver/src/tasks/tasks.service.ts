import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksGateway } from './tasks.gateway';

@Injectable()
export class TasksService {
  create(createTaskDto: CreateTaskDto) {
    return 'This action adds a new task';
  }

  findAll() {
    return `This action returns all tasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(data: string) {
    console.log(data);
    // client.emit('updateTask')
    return `This action updates a #${data} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
