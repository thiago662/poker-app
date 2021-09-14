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

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    this.newUser();
    this.myUser();
    this.allUsers();
    this.userDeleted();
    this.myDelete();
    this.userUpdated();
    this.myUpdate();
    this.showAll();
    this.showMe();
    this.resetAll();
    this.resetMe();
  }

  // EMIT
  setUser() {
    this.webSocketService.emit('setUser', this.user);
  }

  setValue() {
    console.log('setValue', this.user);

    this.webSocketService.emit('setValue', this.user);
  }

  delete() {
    var user = JSON.parse(<string>localStorage.getItem('user'));
    console.log('delete', user.id);

    this.webSocketService.emit('delete', user.id);
  }

  show() {
    console.log('show');

    this.webSocketService.emit('show', []);
  }

  reset() {
    console.log('reset');

    this.webSocketService.emit('reset', []);
  }

  // LISTEN
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

      this.user = JSON.parse(<string>localStorage.getItem('user'));
      console.log('myUser', data);
    });
  }

  userDeleted() {
    this.webSocketService.listen('userDeleted').subscribe((data) => {
      console.log('userDeleted', data);
      this.users = this.users.filter(function(item: any) {
          return item.id != data;
      });
    });
  }

  myDelete() {
    this.webSocketService.listen('myDelete').subscribe((data) => {
      console.log('myDelete', data);
      this.users = this.users.filter(function(item: any) {
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
    });
  }

  showMe() {
    this.webSocketService.listen('showMe').subscribe((data: any) => {
      console.log('showMe', data);

      for (const user of data) {
        var objIndex = this.users.findIndex(((obj: any) => obj.id == user.id));

        this.users[objIndex] = user;
      }
    });
  }

  resetMe() {
    this.webSocketService.listen('resetMe').subscribe((data: any) => {
      console.log('resetMe', data);

      for (const user of data) {
        var objIndex = this.users.findIndex(((obj: any) => obj.id == user.id));

        this.users[objIndex] = user;
      }
    });
  }

  resetAll() {
    this.webSocketService.listen('resetAll').subscribe((data: any) => {
      console.log('resetAll', data);

      for (const user of data) {
        var objIndex = this.users.findIndex(((obj: any) => obj.id == user.id));

        this.users[objIndex] = user;
      }
    });
  }

  allUsers() {
    this.webSocketService.listen('allUsers').subscribe((data) => {
      console.log('allUsers', data);
    });
  }
}
