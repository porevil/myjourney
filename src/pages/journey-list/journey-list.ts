import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { DashBoardPage } from '../dash-board/dash-board';
import { JourneyListModel } from '../../models/JourneyListModel';
import { LocalData } from '../../providers/local-data';
import { Keyboard } from 'ionic-native';

/*
  Generated class for the JourneyList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-journey-list',
  templateUrl: 'journey-list.html'
})
export class JourneyListPage {
  journeylists: JourneyListModel[] = [];

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public dataService: LocalData, public platform: Platform) { }

  ionViewDidLoad(){

    this.platform.ready().then(() => {

      // Check to display IntroPage
      /*
      this.storage.get('introShown').then((result) => {
        if(!result){
          this.storage.set('introShown', true);
          this.nav.setRoot(IntroPage);
        }
        
      });
*/
      // return promise
      this.dataService.getData().then((journeylists) => {

        let savedChecklists: any = false;

        if(typeof(journeylists) != "undefined"){
          // decode JSON to array savedChecklists
          savedChecklists = JSON.parse(journeylists);
        }

        if(savedChecklists){

          // loop every item in array savedChecklists
          savedChecklists.forEach((savedChecklist) => {

            // create new ChecklistModel base on each data
            // this event for Observe abilities
            let loadChecklist = new JourneyListModel(savedChecklist.title,savedChecklist.created_date ,savedChecklist.items);

            // push ChecklistModel to this.checklists
            this.journeylists.push(loadChecklist);

            // Observe checklist and save
            loadChecklist.journeyList.subscribe(update => {
              this.save();
            });

          });// end savedCheckLists.forEach

        }

      }); // end data service.getData().then

    }); // end platform.ready()then

  }

  newJourney() {
    console.log(' new Journey')
    let prompt = this.alertCtrl.create({
      title: 'New Journey',
      message: 'Name of your new Journey : ',
      inputs: [
        {
          name: 'name'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            let newjourneylist = new JourneyListModel(data.name, this.currentDate(), []);
            this.journeylists.push(newjourneylist);

            newjourneylist.journeyList.subscribe(update => {
              this.save();
            });

            this.save();
          }
        }
      ]
    });

    prompt.present();
    //this.navCtrl.push(DashBoardPage);
  }

  save() {
    Keyboard.close();
    this.dataService.save(this.journeylists);
  }

  gotoDashBoard(){
    console.log('goto Dashboard')
    this.navCtrl.push(DashBoardPage);
  }

  currentDate(): string {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    let todaystr = dd + '/' + mm + '/' + yyyy + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getMilliseconds();
    return todaystr;

  }

}
