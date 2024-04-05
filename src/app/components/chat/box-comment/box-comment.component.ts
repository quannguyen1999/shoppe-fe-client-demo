
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DATA_LOREM_FAKE, IMAGE_DATA_FAKE_ONE, LIST_COMMENT} from 'src/app/constants/constant-value-model';
import { Comment } from 'src/app/models/comment.model';
import { Emotion } from 'src/app/models/emotion.model';
import { generateRandomId } from 'src/app/utils/util-fnc.model';

@Component({
  selector: 'app-box-comment',
  templateUrl: './box-comment.component.html',
  styleUrls: ['./box-comment.component.scss']
})
export class BoxCommentComponent implements OnInit, AfterViewInit{
  //init
  currentReplyComment: Comment | undefined;
  isShowReplyBox: boolean = false;
  imageTitleFake: string = IMAGE_DATA_FAKE_ONE;
  titleBoxComment: string = DATA_LOREM_FAKE;
  currentAccount: string = 'admin';
  inputValueComment: string = '';
  listComment: Array<Comment> = LIST_COMMENT;
  shouldScrollToBottom: boolean = false;
  customEmojiSet: '' | 'apple' | 'google' | 'twitter' | 'facebook' = '';
  @ViewChild('messageContainer') messageContainer!: ElementRef;

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

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
      avatar: IMAGE_DATA_FAKE_ONE,
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
      if(existingComment != null){
        const existingEmotion: Emotion = existingComment.emotions!.find(emotion => emotion.comment = event.emoji.native)!;
        if(existingEmotion !== undefined){
          existingEmotion.total! += 1;
        }else{
          existingComment.emotions!.push({
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
        avatar: IMAGE_DATA_FAKE_ONE,
        emotions: []
      })

      this.scrollToBottom();
  
    }

    onFileSelected(event: any): void {
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
