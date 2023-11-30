
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { dataLoremFake, imageDataFakeOne, listComment } from 'src/app/constants/data-fake.model';
import { Comment } from 'src/app/models/comment.model';
import { Emotion } from 'src/app/models/emotion.model';
import { generateRandomId } from 'src/app/utils/util-fnc.model';

@Component({
  selector: 'app-box-comment',
  templateUrl: './box-comment.component.html',
  styleUrls: ['./box-comment.component.scss']
})
export class BoxCommentComponent implements OnInit, AfterViewInit{
  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  currentReplyComment: Comment | undefined;

  isShowReplyBox: boolean = false;

  imageTitleFake: string = imageDataFakeOne;

  titleBoxComment: string = dataLoremFake;

  currentAccount: string = 'admin';

  inputValueComment: string = '';

  listComment: Array<Comment> = listComment;

  shouldScrollToBottom: boolean = false;

  customEmojiSet: '' | 'apple' | 'google' | 'twitter' | 'facebook' = '';


  @ViewChild('messageContainer') messageContainer!: ElementRef;

  ngOnInit(): void {
  }

  onEnterComment(){

    if(this.inputValueComment === ''){
      return;
    }

    if(this.currentReplyComment !== undefined){
      this.isShowReplyBox = false;
    }

    this.listComment.push({
      id: 1,
      username: 'admin',
      comment: this.inputValueComment,
      dateCreated: new Date(),
      avatar: imageDataFakeOne,
      emotions: [],
      referComment: this.currentReplyComment !== undefined ? {
        id: this.currentReplyComment.id,
        username: this.currentReplyComment.username,
        comment: this.currentReplyComment.comment
      } : undefined
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

    showElementComment(comment: Comment){
      this.listComment.find(data => data.id === comment.id)!
      .isElementVisible = true;
    }

    hideElementComment(comment: Comment){
      this.listComment.find(data => data.id === comment.id)!
      .isElementVisible = false;
    }




}
