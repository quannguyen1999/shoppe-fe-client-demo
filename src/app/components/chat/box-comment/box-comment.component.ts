
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { dataLoremFake, imageDataFakeOne } from 'src/app/constants/data-fake.model';
import { Comment } from 'src/app/models/comment.model';
import { Emotion } from 'src/app/models/emotion.model';
import { generateRandomId } from 'src/app/utils/util-fnc.model';

@Component({
  selector: 'app-box-comment',
  templateUrl: './box-comment.component.html',
  styleUrls: ['./box-comment.component.scss']
})
export class BoxCommentComponent implements OnInit{

  currentReplyComment: Comment | undefined;

  isShowReplyBox: boolean = false;

  imageTitleFake: string = imageDataFakeOne;

  titleBoxComment: string = dataLoremFake;

  currentAccount: string = 'admin';

  inputValueComment: string = '';

  listComment: Array<Comment> = [];

  shouldScrollToBottom: boolean = false;

  customEmojiSet: '' | 'apple' | 'google' | 'twitter' | 'facebook' = '';


  @ViewChild('messageContainer') messageContainer!: ElementRef;

  ngOnInit(): void {
    this.listComment.push({
      id: generateRandomId(),
      username: 'admin',
      comment: 'this con me',
      dateCreated: new Date(),
      avatar: imageDataFakeOne,
      emotions: [{
        id: generateRandomId(),
        comment: '👍',
        total: 2,
        dateCreated:  new Date(),
      }]
    })

    this.listComment.push({
      id: generateRandomId(),
      username: 'client',
      comment: 'fuck this shit',
      dateCreated: new Date(),
      avatar: imageDataFakeOne,
      emotions: [{
        id: generateRandomId(),
        comment: '👍',
        total: 2,
        dateCreated:  new Date(),
      }]
    })

    this.listComment.push({
      id: generateRandomId(),
      username: 'admin',
      comment: 'hehe ewqeqwe ',
      dateCreated: new Date(),
      avatar: imageDataFakeOne,
      emotions: [{
        id: generateRandomId(),
        comment: '👍',
        total: 2,
        dateCreated:  new Date(),
      }]
    })

    this.listComment.push({
      id: generateRandomId(),
      username: 'admin',
      comment: 'o o o ',
      dateCreated: new Date(),
      avatar: imageDataFakeOne,
      emotions: []
    })

    this.listComment.push({
      id: generateRandomId(),
      username: 'client',
      comment: 'fuck this shit',
      dateCreated: new Date(),
      avatar: imageDataFakeOne,
      emotions: []
    })

    this.listComment.push({
      id: generateRandomId(),
      username: 'admin',
      comment: 'hehe ewqeqwe ',
      dateCreated: new Date(),
      avatar: imageDataFakeOne,
      emotions: []
    })

    this.listComment.push({
      id: generateRandomId(),
      username: 'admin',
      comment: 'o o o ',
      dateCreated: new Date(),
      avatar: imageDataFakeOne,
      emotions: []
    })

    this.listComment.push({
      id: generateRandomId(),
      username: 'client',
      comment: dataLoremFake + dataLoremFake,
      dateCreated: new Date(),
      avatar: imageDataFakeOne,
      emotions: [{
        id: generateRandomId(),
        comment: '👍',
        total: 1,
        dateCreated:  new Date(),
      }]
    })

    this.listComment.push({
      id: generateRandomId(),
      username: 'admin',
      comment: 'hehe ewqeqwe ',
      dateCreated: new Date(),
      avatar: imageDataFakeOne,
      emotions: []
    })

    this.listComment.push({
      id: generateRandomId(),
      username: 'admin',
      comment: 'o o o ',
      dateCreated: new Date(),
      avatar: imageDataFakeOne,
      emotions: []
    })

    this.listComment.push({
      id: generateRandomId(),
      username: 'client',
      comment: 'fuck this shit',
      dateCreated: new Date(),
      avatar: imageDataFakeOne,
      emotions: []
    })

    // this.scrollToBottom();
  }

  onEnterComment(){

    if(this.currentReplyComment !== undefined){
      this.isShowReplyBox = false;
    }

    this.listComment.push({
      id: 1,
      username: 'admin',
      comment: this.inputValueComment,
      dateCreated: new Date(),
      avatar: imageDataFakeOne,
      emotions: []
    })

    this.inputValueComment = '';

    // Set the flag to true so that scrollToBottom will be triggered
    this.shouldScrollToBottom = true;
 
    this.scrollToBottom();
  }

   
    ngAfterViewChecked() {
      if (this.shouldScrollToBottom) {
        this.scrollToBottom();
        this.shouldScrollToBottom = false;
      }
    }

    scrollToBottom() {
      try {
        // Set the scrollTop property to the maximum value to scroll to the bottom
        this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
      } catch (err) {
        console.error(err);
      }
    }

    handleEmojiClick(event: Event) {
      event.stopPropagation();
    }

    handleEmojiSelect(event: any) {
      this.inputValueComment += event.emoji.native;
    }

    handleEmojiSpecific(event: any, idComment: number ){
      const existingComment: Comment = this.listComment.find(comment => comment.id === idComment)!;
      // console.log(existingComment)
      if(existingComment != null){
        const existingEmotion: Emotion = existingComment.emotions.find(emotion => emotion.comment = event.emoji.native)!;
        // console.log(existingEmotion)
        if(existingEmotion !== undefined){
           console.log('fuck')
          existingEmotion.total += 1;
        }else{
          existingComment.emotions.push({
            id: generateRandomId(),
            comment: event.emoji.native,
            total: 1,
            dateCreated:  new Date(),
          });
        }
      }else{
        console.log('Error');
      }
    }
    
    onChangeLike(){

      this.listComment.push({
        id: 1,
        username: 'admin',
        comment:  '👍',
        dateCreated: new Date(),
        avatar: imageDataFakeOne,
        emotions: []
      })

      this.scrollToBottom();
  
    }

    onFileSelected(event: any): void {
      console.log("file is selected")
      const file: File = event.target.files[0];
      if (file) {
        // Handle the selected file, for example, by uploading it
        // this.uploadFile(file);
      }
    }

    onReplyMessage(comment: Comment){
      this.currentReplyComment = comment;
      this.isShowReplyBox  = true;
    }

    onCloseReply(){
      this.currentReplyComment = undefined;
      this.isShowReplyBox = !this.isShowReplyBox;
    }




}
