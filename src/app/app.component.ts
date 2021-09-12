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
    this.newUser();
    this.myUser();
    this.allUsers();
  }

  setUser() {
    this.webSocketService.emit('setUser', this.user);
  }

  newUser() {
    this.webSocketService.listen('newUser').subscribe((data) => {
      this.users.push(data);
      console.log('newUser', data);
    });
  }

  myUser() {
    this.webSocketService.listen('myUser').subscribe((data) => {
      this.users.push(data);
      localStorage.setItem('user', JSON.stringify(data));

      // var storedNames = JSON.parse(<string>localStorage.getItem('user'));
      console.log('myUser', data);
    });
  }

  delete() {
    var user = JSON.parse(<string>localStorage.getItem('user'));
    console.log(user.id);

    this.webSocketService.emit('delete', user.id);
  }

  allUsers() {
    this.webSocketService.listen('allUsers').subscribe((data) => {
      console.log('allUsers', data);
    });
  }
}
