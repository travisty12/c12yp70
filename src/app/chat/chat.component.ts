import { Component, Input, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { Message } from '../message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [DatabaseService]
})
export class ChatComponent implements OnInit {
  chats: FirebaseListObservable<any[]>;
  messages: FirebaseListObservable<any[]>;
  @Input() allChats;
  a;
  b;
  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
    this.chats = this.databaseService.getChat();
  }

  sendMessage(message: string, name: string) {
    let user;
    let that = this;
    if (name != "") {
      user = name;
    } else {
      user = "Anonymous";
    }
    this.chats.subscribe(info => {
      that.a = info;
    })
    let i;
    if(this.a) {
      i = this.a.length;
    } else {
      i = 0;
    }
    console.log(i);
    const reply = new Message(message, user);
    console.log(reply);
    // for (let j = 0; j < this.a.length; j++) {
    //   const messageIndex = j;
    //   console.log("IS working");
    // }
    this.databaseService.addMessage(reply, i);
    return;

  }


  deleteThisMessage(chat) {
    this.chats.subscribe(info => {
      this.b = info;
    })
    this.databaseService.deleteChat(chat, this.b);
  }
}
