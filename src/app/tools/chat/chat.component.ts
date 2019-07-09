
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Component, OnInit, Renderer2, Inject, ViewChild, ElementRef } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'bylh-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messageContainer
  @ViewChild('messageContainer', {static: false}) msgConRef: ElementRef;
  @ViewChild('messageList', {static: false}) msgRef: ElementRef;

  socket: SocketIOClient.Socket;
  inputMessage: string;
  roomid = '100';
  userInfo = {
    username: 'bylh' + Math.round(Math.random() * 1000)
  }

  constructor(
    private render: Renderer2,
    // public dialogRef: MatDialogRef<ChatComponent>,
    // @Inject(MAT_DIALOG_DATA)
    //  public data: any
  ) { }

  onNoClick(): void {
    // this.dialogRef.close();
  }
  ngOnInit() {
    this.open();
  }

  sendMessage() {
    /*点击发送按钮*/

    /*向服务器提交一个say事件，发送消息*/
    let data = {
      text: this.inputMessage,
      type: 0,
      username: this.userInfo.username
    };
    console.log('发送消息', data);
    this.socket.emit('say', data);
    this.inputMessage = '';
    // this.render.appendChild()
    this.showMessage(data);
    // 发送完消息滚动到最底部
    this.msgConRef.nativeElement.scrollTop = this.msgConRef.nativeElement.scrollHeight;
  }

  /*展示消息*/
  showMessage(data) {

    let div = this.render.createElement('div');

    this.render.addClass(div, data.type === 0 ? 'msg-info-me' : 'msg-info-other');

    let dt = this.render.createElement('dt');
    this.render.addClass(dt, 'nick-name');
    dt.innerHTML = data.username;
    this.render.appendChild(div, dt);

    let dtt = this.render.createElement('dt');
    dtt.innerHTML = data.text;
    this.render.addClass(dtt, 'text');
    this.render.appendChild(div, dtt);

    this.render.appendChild(this.msgRef.nativeElement, div);



  }

  /*展示通知*/
  showNotice(data) {
    let p = this.render.createElement('p');
    p.innerHTML = data.text;
    this.render.addClass(p, 'notice');
    this.render.appendChild(this.msgRef.nativeElement, p);
  }

  // TODO
  close() {
    this.socket.close();

    this.socket = null;
    console.log('关闭socket');
  }

  // TODO
  open() {
    console.log('打开socket');
    if (this.socket != null) {
      this.socket.close();
      this.socket = null;
    }
    if (this.roomid != null && this.roomid != '') {
      this.socket = io.connect(`${environment.BaseServerUrl}/chat?roomid=` + this.roomid);
      /*连接完毕，马上发送一个'join'事件，把自己的用户名告诉别人*/
      this.socket.emit('join', {
        username: this.userInfo.username
      });

      this.socket.on('message', (msg) => {
        switch (msg.event) {
          case 'join':
            if (msg.data.username) {
              console.log(msg.data.username + '加入了聊天室');
              let data = {
                text: msg.data.username + '加入了聊天室'
              };
              this.showNotice(data);
            }
            break;
          case 'broadcast_say':
            if (msg.data.username !== this.userInfo.username) {
              console.log(msg.data.username + '说: ' + msg.data.text);
              this.showMessage(msg.data);
            }
            break;
          case 'broadcast_quit':
            if (msg.data.username) {
              console.log(msg.data.username + '离开了聊天室');
              let data = {
                text: msg.data.username + '离开了聊天室'
              };
              this.showNotice(data);
            }
            break;
        }
      })

    }

    console.log('打开socket', this.socket.connected);
  }
  isOpened() {
    return this.socket != null;
  }
  cancel(): void {
    // this.overlayRef.dispose();
  }
}
