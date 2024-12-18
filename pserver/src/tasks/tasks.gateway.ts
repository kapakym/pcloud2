import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TasksService } from './tasks.service';

@WebSocketGateway({
  cors: {
    origin: '*', // можно указать `*` для отключения `CORS`
  },
  namespace: '',
})
export class TasksGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly tasksService: TasksService) {}

  @WebSocketServer() server: Server;
  public clients: Map<string, Socket> = new Map();

  afterInit() {
    console.log('WebSocket server initialized');
  }

  handleConnection(client: Socket) {
    this.server.emit('tasks', 'run');
    client.send({ id: client.id });
    this.clients.set(client.id, client);
    console.log(`Client connected: ${client.id}`);
    console.log(`client total ${this.clients.size}`);
  }

  handleDisconnect(client: Socket) {
    this.clients.delete(client.id);
    console.log(`Client disconnected: ${client.id}`);
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
