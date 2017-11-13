import { Component } from '@angular/core';
import { NavController, Events, ViewController } from 'ionic-angular';
import { DsService } from '../../shared/ds.service';
import { Message } from '../message/message';
import { RecordListenService } from '../../shared/recordlisten.service';

@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html'
})
export class Inbox {
  messages;
  messagesRecord;
  newMessagesCount;
  tutors;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, private ds: DsService, public events:Events, private rls:RecordListenService) {
    this.messagesRecord = this.ds.profileRecord.get("messages");
    this.newMessagesCount = this.ds.profileRecord.get('newMessagesCount');
    this.messages = Object.keys(this.messagesRecord);
    events.subscribe('user:message', () => {
      this.messagesRecord = this.ds.profileRecord.get("messages");
      this.newMessagesCount = this.ds.profileRecord.get('newMessagesCount');
      this.messages = Object.keys(this.ds.profileRecord.get('messages'));
    });
  }

  viewMessage(message) {
    this.navCtrl.push(Message, {username:message});
  }

}
