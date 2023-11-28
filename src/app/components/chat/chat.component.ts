import { Component, OnInit } from '@angular/core';
import { dataLoremFake, imageDataFakeOne } from 'src/app/constants/data-fake.model';
import { Chat } from 'src/app/models/chat.model';
import { generateRandomId } from 'src/app/utils/util-fnc.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{

  currentSelectChat: Chat | undefined;
  
  isDisplayChat: boolean = true;

  isDisplayComment: boolean = true;

  isDisplayWelcome: boolean = false;

  listChat: Array<Chat> = [];

  valueSearch: string | undefined;

  ngOnInit(): void {
    this.listChat.push({
      id: generateRandomId(),
      name: 'bitch',
      comment: dataLoremFake,
      avatar: imageDataFakeOne
    })

    this.listChat.push({
      id: generateRandomId(),
      name: 'slut',
      comment: dataLoremFake,
      avatar: imageDataFakeOne
    })
  }

  onChangeChat(){
    this.isDisplayChat = !this.isDisplayChat;
  }

  onChangeComment(){
    this.isDisplayComment = !this.isDisplayComment;
  }

  onClickDetailChat(chat: Chat){
    this.currentSelectChat = chat;
    this.isDisplayComment = true;
    this.isDisplayWelcome = false;
  }
 


}
