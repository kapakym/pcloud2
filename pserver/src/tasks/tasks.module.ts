import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksGateway } from './tasks.gateway';

@Module({
  providers: [TasksGateway, TasksService],
  exports: [TasksGateway],
})
export class TasksModule {}
