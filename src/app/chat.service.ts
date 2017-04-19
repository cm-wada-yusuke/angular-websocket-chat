import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Rx';
import {WebSocketService} from './websocket.service';
import {ChatMessage} from './chat/chat.message';

@Injectable()
export class ChatService {

  private messages: Subject<ChatMessage>;

  constructor(private ws: WebSocketService) {
  }

  connect(roomNumber: string, name: string): Subject<ChatMessage> {
    return this.messages = <Subject<ChatMessage>>this.ws
      .connect(this.chatUrl(roomNumber, name))
      .map((response: MessageEvent): ChatMessage => {
        const data = response.data as ChatMessage;
        return data;
      });
  }

  private chatUrl(roomNumber: string, name: string): string {
    return `ws://localhost:9000/chat/stream/${roomNumber}?user_name=${name}`;
  }

  send(name: string, message: string): void {
    console.log(JSON.stringify(this.createMessage(name, message)));
    this.messages.next(this.createMessage(name, message));
  }

  private createMessage(name: string, message: string): ChatMessage {
    const m = new ChatMessage(name, message, false);
    console.log(JSON.stringify(m));
    return new ChatMessage(name, message, false);
  }

}
