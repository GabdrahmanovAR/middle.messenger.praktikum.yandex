import { IMessageType } from '../@models/websocket';
import EventBus from './EventBus';

export enum WSTransportEvent {
  OPEN = 'open',
  CLOSE = 'close',
  ERROR = 'error',
  MESSAGE = 'message',
}

export default class WSTransport extends EventBus {
  private socket?: WebSocket;

  private pingInterval?: ReturnType<typeof setInterval>;

  private readonly pingIntervalTime = 30_000;

  private url: string;

  constructor(url: string) {
    super();
    this.url = url;
  }

  public send(data: string | number | object): void {
    if (!this.socket) {
      throw new Error('Отсутствуте websocket соединение');
    }

    this.socket.send(JSON.stringify(data));
  }

  public connect(): Promise<void> {
    if (this.socket) {
      throw new Error('Websocket уже подключен');
    }

    this.socket = new WebSocket(this.url);
    this.subscribe(this.socket);
    this.setupPing();

    return new Promise((resolve, reject) => {
      this.on(WSTransportEvent.ERROR, reject);
      this.on(WSTransportEvent.OPEN, () => {
        this.off(WSTransportEvent.ERROR, reject);
        resolve();
      });
    });
  }

  public close(): void {
    this.socket?.close();
    clearInterval(this.pingInterval);
  }

  private setupPing(): void {
    this.pingInterval = setInterval(() => {
      this.send({ type: 'ping' });
    }, this.pingIntervalTime);

    this.on(WSTransportEvent.CLOSE, () => {
      clearInterval(this.pingInterval);
      this.pingInterval = undefined;
    });
  }

  private subscribe(socket: WebSocket): void {
    socket.addEventListener('open', () => {
      this.emit(WSTransportEvent.OPEN);
    });

    socket.addEventListener('close', () => {
      this.emit(WSTransportEvent.CLOSE);
    });

    socket.addEventListener('error', (event: Event) => {
      this.emit(WSTransportEvent.ERROR, event);
    });

    socket.addEventListener('message', (message: MessageEvent<string>) => {
      try {
        const data = JSON.parse(message.data) as IMessageType;
        if (['pong', 'user connected'].includes(data?.type)) {
          return;
        }
        this.emit(WSTransportEvent.MESSAGE, data);
      } catch (error) {
        // empty
      }
    });
  }
}
