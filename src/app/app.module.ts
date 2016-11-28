import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { DashBoardPage } from '../pages/dash-board/dash-board';
import { JourneyListPage } from '../pages/journey-list/journey-list';
import { UserData } from '../providers/user-data';
import { Storage } from '@ionic/storage';
import { LocalData } from '../providers/local-data';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    DashBoardPage,
    JourneyListPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    DashBoardPage,
    JourneyListPage
  ],
  providers: [UserData,Storage,LocalData]
})
export class AppModule {}
