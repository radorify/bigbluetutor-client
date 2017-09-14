import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DsService } from '../../shared/ds.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  username;
  password;
  constructor(public navCtrl: NavController, private ds: DsService) {

  }

  login() {
    console.log(this.username);
    this.ds.login({ username: this.username, password: this.password }, this.handleLogin.bind(this));
  }

  handleLogin(success, data) {
    if(success) {
      this.ds.dsInstance.record.has("profile/"+this.username, this.linkProfile.bind(this));
    }else {
      console.log(success);
    }
  }

  linkProfile(error, hasRecord) {
    var record = this.ds.getRecord("profile/"+this.username);
    if(!hasRecord) {
      record.set({
        username: this.username,
        password: '',
        stars: [],
        pendingMeetings: [],
        requestMeetings: [],
        messages: {},
        meeting: ""
      });
    }
    this.ds.profileRecord = record;
    this.ds.dataRecord = this.ds.getRecord("data")
    this.ds.dataRecord.whenReady(() => {
      this.goToHome();
    })
  }

  goToHome() {
    this.navCtrl.setRoot(HomePage);
  }
}
