import { Component } from '@angular/core';
import { Platform, NavController, MenuController, AlertController, LoadingController } from 'ionic-angular';
import { Facebook } from 'ionic-native';
import { HomePage } from '../home/home';
import { UserData } from '../../providers/user-data';
import { JourneyListPage } from '../journey-list/journey-list';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // load
  loading: any;
  enableFacebook: boolean;

  constructor(public nav: NavController, public platform: Platform,
    public menu: MenuController, public dataService: UserData, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    console.log(' Constructor Login Page');
    this.enableFacebook = false;
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.dataService.getData().then((userprofile_result) => {
      if (userprofile_result && typeof (userprofile_result) != "undefined") {
        let userprofile = JSON.parse(userprofile_result);
        this.info('Welcome','Hello '+userprofile.username+' if not you please logout.')
        console.log('load on init : ' + userprofile)
      } else {
        console.log('load on init : N/A')
      }
    }, (error) => {
      console.log('load on init : N/A')
    });

    //this.menu.enable(false);
  }

  login(): void {
    this.loading.present();
    if (this.enableFacebook) {
      Facebook.login(['public_profile']).then((response) => {
        this.getProfile();
      }, (err) => {
        let alert = this.alertCtrl.create({
          title: 'Oops!',
          subTitle: 'Something went wrong, please try again later.',
          buttons: ['Ok']
        });
        //this.loading.dismiss();
        alert.present();
      });
    } else {

      let user_profile = {
        fbid: 1234568879,
        username: 'porevil',
        picture: ''
      };

      this.nav.setRoot(JourneyListPage);
      this.dataService.saveUserProfile(user_profile);
      this.loading.dismiss();
    }

    this.dataService.getData().then((result) => {
      if (result && typeof (result) != "undefined") {
        console.log('result : ' + result)
      } else {
        console.log('result : N/A')
      }
    }, (error) => {
      console.log('result : N/A')
    });

  }

  getProfile(): void {
    //this.debug('facebook api in progress')
    Facebook.api('/me?fields=id,name,picture,email,first_name,last_name,age_range,gender', ['public_profile']).then(
      (response) => {
        //this.debug('facebook api response')
        //console.log(response);
        this.dataService.fbid = response.id;
        this.dataService.username = response.name;
        this.dataService.picture = response.picture.data.url;
        //this.menu.enable(true);
        this.loading.dismiss();
        this.info('','Hi ' + this.dataService.username + ' Welcome to LETS CHAT enjoy! ')
        this.nav.setRoot(HomePage);
      }, (err) => {
        console.log(err);
        let alert = this.alertCtrl.create({
          title: 'Oops!',
          subTitle: 'Something went wrong, please try again later.',
          buttons: ['Ok']
        });
        //this.loading.dismiss();
        alert.present();
      }
    );

  }

  debug(value: string) {

    let alert = this.alertCtrl.create({
      title: 'Oh Yeah!',
      subTitle: 'value [' + value + ']',
      buttons: ['Ok']
    });
    alert.present();

  }
  ionViewDidLoad() {
    console.log('Hello Login Page');
  }

  info(title: string,value: string) {

    let alert = this.alertCtrl.create({
      title: title,
      subTitle: value,
      buttons: ['Ok']
    });
    alert.present();

  }

}
