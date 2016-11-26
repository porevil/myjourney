import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the UserData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserData {

  fbid: number;
  username: string;
  picture: string;

  constructor(public storage: Storage) {
    console.log('Hello UserData Provider');
  }

  saveUserProfile(data) {
    let newData = JSON.stringify(data);
    console.log('save newData : '+newData);
    this.storage.set('user_profile', newData);
    console.log('save newData : done');
  }

  getData(): Promise<any> {
    
    return this.storage.get('user_profile');
  }

}
