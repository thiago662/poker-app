import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  users: any = [];
  user = {
    name: ''
  };

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    this.myUser();
    this.myRoom();
    this.newUser();
  }

  setUser() {
    this.webSocketService.emit('setUser', this.user);
  }

  myUser() {
    this.webSocketService.listen('myUser').subscribe((data) => {
      this.users.push(data);
      console.log('myUser', data);
    });
  }

  myRoom() {
    this.webSocketService.listen('myRoom').subscribe((data:any) => {
      for (const user of data) {
        this.users.push(user);
      }
      console.log('myRoom', data);
    });
  }

  newUser() {
    this.webSocketService.listen('newUser').subscribe((data) => {
      this.users.push(data);
      console.log('newUser', data);
    });
  }
}
