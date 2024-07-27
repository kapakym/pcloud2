import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'dgram';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';

@WebSocketGateway({
  cors: {
    origin: '*', // можно указать `*` для отключения `CORS`
  },
  namespace: 'tasks',
})
export class TasksGateway {
  constructor(private readonly tasksService: TasksService) {}

  @WebSocketServer() public server: Socket;

  @SubscribeMessage('createTask')
  create(@MessageBody() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @SubscribeMessage('findAllTasks')
  findAll() {
    return this.tasksService.findAll();
  }

  @SubscribeMessage('findOneTask')
  findOne(@MessageBody() id: number) {
    return this.tasksService.findOne(id);
  }

  @SubscribeMessage('updateTask')
  update(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    // client.emit('updateTask', data);
    return client.emit('updateTask', this.tasksService.update(data));
  }

  @SubscribeMessage('removeTask')
  remove(@MessageBody() id: number) {
    return this.tasksService.remove(id);
  }
}
