import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {ChatService} from '../chat.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {ChatMessage} from './chat.message';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService]
})
export class ChatComponent implements OnInit {

  roomNumber: string;
  name: string;
  messages: ChatMessage[] = new Array();


  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute
  ) {
  }

  send(message: string): void {
    this.chatService.send(
      this.name, message
    );
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.roomNumber = params['roomNumber'];
    });

    this.route.queryParams.forEach((params: Params) => {
      this.name = params['name'];
    });

    this.chatService.connect(this.roomNumber, this.name).subscribe(msg => {
      this.messages.push(msg);
    });
  }

}
