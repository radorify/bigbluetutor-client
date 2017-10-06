import { Injectable } from '@angular/core';
import * as deepstream from 'deepstream.io-client-js';

@Injectable()
export class DsService {

  private ds;
  public dsInstance;
  public profileRecord;
  public dataRecord;

  constructor() {
  }

  login (credentials?, loginHandler?) {
    //this code is moved here to prevent the login timeouts
    //this.ds = this.dsInstance = deepstream('tutor-back.blindside-dev.com:6020')
    this.ds = this.dsInstance = deepstream('10.130.218.198:6020')
      .on('error', error => console.log(error));
    this.ds.login(credentials, loginHandler);
  }

  getRecord(name) {
    return this.ds.record.getRecord(name);
  }

  getList(name) {
    return this.ds.record.getList(name);
  }
}
