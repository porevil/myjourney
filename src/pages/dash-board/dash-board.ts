import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the DashBoard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dash-board',
  templateUrl: 'dash-board.html'
})
export class DashBoardPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello DashBoard Page');
  }

}
