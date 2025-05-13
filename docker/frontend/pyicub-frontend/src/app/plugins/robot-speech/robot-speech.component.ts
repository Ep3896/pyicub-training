import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {WidgetBaseComponent} from '../../widget-base/widget-base.component';
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-robot-speech',
  templateUrl: './robot-speech.component.html',
  styleUrl: './robot-speech.component.css'
})
export class RobotSpeechComponent extends WidgetBaseComponent {

  @ViewChild('scrollContainer') private myScrollContainer: ElementRef;
  @ViewChild('messageInput', {read: MatInput}) messageInput: MatInput;

  readonly messageColors = {
    "CREATED": 'lightgray',
    "SENDING": '#FFF778FF',
    "SENT": 'lightgreen',
    "FAILED": 'indianred'
  }
  messages: { text: string, status: string }[] = [];
  newMessage = ""
  inputDisabled = false;

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  onEnterPress() {
    this.sendMessage()
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.inputDisabled = true;
      let messageObject = {
        text: this.newMessage,
        status: "CREATED"
      };
      this.newMessage = "";
      this.messages.push(messageObject);
      this.cdr.detectChanges()
      this.scrollToBottom()
      this.speechSayAsync(messageObject.text).subscribe({
        next: requestID => {
          const onRunningCallback = () => {
            messageObject.status = "SENDING";
          }
          const onDoneCallback = () => {
            messageObject.status = "SENT";
            this.inputDisabled = false;
          }

          const onFailedCallback = () => {
            messageObject.status = "FAILED";
            this.inputDisabled = false;
          }

          this.checkAsyncRequestStatus(requestID, () => {
          }, onRunningCallback, onDoneCallback, onFailedCallback)

        },
        error: err => {
          messageObject.status = "FAILED";
          this.inputDisabled = false;
        }
      })
    }
  }


  scrollToBottom() {
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  }

}
