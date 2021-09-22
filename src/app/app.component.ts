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
    id: '',
    name: '',
    value: '',
    selected: false
  };
  isVisible = false;
  isEditing = true;
  points = ['?', 0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

  constructor(private webSocketService: WebSocketService) { }

  ngOnInit() {
    this.checkUserExist();

    this.myId();
    this.room();
    this.myName();
    this.userName();
    this.myUser();
    this.newUser();
    this.userDeleted();
    this.myDelete();
    this.userUpdated();
    this.myUpdate();
    this.showAll();
    this.showMe();
    this.resetMe();
    this.resetAll();
    this.allUsers();
  }

  // EVENT
  editName() {
    if (this.isEditing) {
      this.setName();
    }

    this.isEditing = !this.isEditing;
  }

  sendValue(value: any) {
    this.user.value = value;
    this.setValue();
  }

  // EMIT
  generateId() {
    this.webSocketService.emit('generateId', []);
  }

  setName() {
    this.webSocketService.emit('setName', this.user);
  }

  checkUserExist() {
    var user = JSON.parse(<string>localStorage.getItem('user')) ?? null;

    if (user != null) {
      this.webSocketService.emit('checkUserExist', user.id);
    } else {
      this.generateId();
    }
  }

  setValue() {
    this.webSocketService.emit('setValue', this.user);
  }

  delete() {
    var user = JSON.parse(<string>localStorage.getItem('user'));

    this.webSocketService.emit('delete', user.id);
  }

  show() {
    this.webSocketService.emit('show', []);
  }

  reset() {
    this.webSocketService.emit('reset', []);
  }

  // LISTEN
  myId() {
    this.webSocketService.listen('myId').subscribe((data: any) => {
      console.log('myId', data);
      localStorage.setItem('user', JSON.stringify(data));

      this.user = data;
    });
  }

  room() {
    this.webSocketService.listen('room').subscribe((data: any) => {
      console.log('room', data);
      for (const user of data) {
        this.users.push(user);
      }
    });
  }

  myName() {
    this.webSocketService.listen('myName').subscribe((data: any) => {
      console.log('myName', data);
      this.user.name = data.name;
      var objIndex = this.users.findIndex(((obj: any) => obj.id == data.id));

      this.users[objIndex].name = data.name;
    });
  }

  userName() {
    this.webSocketService.listen('userName').subscribe((data: any) => {
      console.log('userName', data);
      var objIndex = this.users.findIndex(((obj: any) => obj.id == data.id));

      this.users[objIndex].name = data.name;
    });
  }

  myUser() {
    this.webSocketService.listen('myUser').subscribe((data: any) => {
      console.log('myUser', data);

      if (data != null) {
        this.user = data

        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        this.generateId();
      }
    });
  }

  newUser() {
    this.webSocketService.listen('newUser').subscribe((data) => {
      console.log('newUser', data);
      this.users.push(data);
    });
  }

  userDeleted() {
    this.webSocketService.listen('userDeleted').subscribe((data) => {
      console.log('userDeleted', data);
      this.users = this.users.filter(function (item: any) {
        return item.id != data;
      });
    });
  }

  myDelete() {
    this.webSocketService.listen('myDelete').subscribe((data) => {
      console.log('myDelete', data);
      this.users = this.users.filter(function (item: any) {
        return item.id != data;
      });
    });
  }

  userUpdated() {
    this.webSocketService.listen('userUpdated').subscribe((data: any) => {
      console.log('userUpdated', data);

      var objIndex = this.users.findIndex(((obj: any) => obj.id == data));

      this.users[objIndex].selected = true;
    });
  }

  myUpdate() {
    this.webSocketService.listen('myUpdate').subscribe((data: any) => {
      console.log('myUpdate', data);

      var objIndex = this.users.findIndex(((obj: any) => obj.id == data.id));

      this.users[objIndex] = data;
    });
  }

  showAll() {
    this.webSocketService.listen('showAll').subscribe((data: any) => {
      console.log('showAll', data);

      for (const user of data) {
        var objIndex = this.users.findIndex(((obj: any) => obj.id == user.id));

        this.users[objIndex] = user;
      }

      this.isVisible = true;
    });
  }

  showMe() {
    this.webSocketService.listen('showMe').subscribe((data: any) => {
      console.log('showMe', data);

      for (const user of data) {
        var objIndex = this.users.findIndex(((obj: any) => obj.id == user.id));

        this.users[objIndex] = user;
      }

      this.isVisible = true;
    });
  }

  resetMe() {
    this.webSocketService.listen('resetMe').subscribe((data: any) => {
      console.log('resetMe', data);

      for (const user of data) {
        var objIndex = this.users.findIndex(((obj: any) => obj.id == user.id));

        this.users[objIndex] = user;
      }

      this.isVisible = false;
    });
  }

  resetAll() {
    this.webSocketService.listen('resetAll').subscribe((data: any) => {
      console.log('resetAll', data);

      for (const user of data) {
        var objIndex = this.users.findIndex(((obj: any) => obj.id == user.id));

        this.users[objIndex] = user;
      }

      this.isVisible = false;
    });
  }

  allUsers() {
    this.webSocketService.listen('allUsers').subscribe((data) => {
      console.log('allUsers', data);
    });
  }
}
