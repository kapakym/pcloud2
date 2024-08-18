import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  // constructor(private TasksGateway: TasksGateway) {}

  findAll() {
    return `This action returns all tasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(data: string) {
    // client.emit('updateTask')
    return `This action updates a #${data} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
