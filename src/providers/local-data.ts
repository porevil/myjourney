import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the LocalData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocalData {

  constructor(public storage: Storage) {
    console.log('Hello LocalData Provider');
  }


  save(data): void {


    let saveData = [];

    //Remove observables
    data.forEach((journeyList) => {
      console.log('newData : ' + newData);
      saveData.push({
        title: journeyList.title,
        created_date: journeyList.created_date,
        //items: checklist.items
      });
    });

    let newData = JSON.stringify(saveData);
    console.log('newData : ' + newData);
    this.storage.set('journeyLists', newData);
  }

  getData() {   
    return this.storage.get('journeyLists');  
  }

}

