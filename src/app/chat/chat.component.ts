import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {ChatService} from '../chat.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {ChatMessage} from './chat.message';

import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService]
})
export class ChatComponent implements OnInit {

  roomNumber: string;
  name: string;

  // for html
  @Input() messages: ChatModel[] = new Array();

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

      const isMe = msg.userName === this.name;


      this.messages.push(new ChatModel(
        msg.userName,
        msg.text,
        msg.systemFlag,
        {
          me: isMe,
          someone: !isMe
        },
        +(Md5.hashStr(msg.userName).toString().slice(0, 3)) % 778
      ));
    });
  }

}

class ChatModel {

  userName: string;
  text: string;
  systemFlag: boolean;
  speaker: {};
  faceColor: number;

  constructor(userName: string, text: string, systemFlag: boolean, speaker: {}, faceColor: number) {
    this.userName = userName;
    this.text = text;
    this.systemFlag = systemFlag;
    this.speaker = speaker;
    this.faceColor = faceColor;
  }
}
