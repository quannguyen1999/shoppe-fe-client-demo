import { Component, OnInit } from '@angular/core';
import { DATA_LOREM_FAKE, IMAGE_DATA_FAKE_ONE, NAME_BRANCH } from 'src/app/constants/constant-value-model';
import { Chat } from 'src/app/models/chat.model';
import { generateRandomId } from 'src/app/utils/util-fnc.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{
  //Init
  nameBranch: string = NAME_BRANCH;
  currentSelectChat: Chat | undefined;
  isDisplayChat: boolean = false;
  isDisplayComment: boolean = true;
  isDisplayWelcome: boolean = true;
  listChat: Array<Chat> = [];
  valueSearch: string | undefined;

  ngOnInit(): void {
    this.listChat.push({
      id: generateRandomId(),
      name: 'bitch',
      comment: DATA_LOREM_FAKE,
      avatar: IMAGE_DATA_FAKE_ONE
    })

    this.listChat.push({
      id: generateRandomId(),
      name: 'slut',
      comment: DATA_LOREM_FAKE,
      avatar: IMAGE_DATA_FAKE_ONE
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
