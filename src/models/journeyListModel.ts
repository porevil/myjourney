import { Observable } from 'rxjs/Observable';

export class JourneyListModel {

    journeyList: any;

    journeylistObserver: any;
    constructor(public title: string, public created_date: string, public items: any[]) {
        this.items = items;
        console.log(' ChecklistModel current date :' + created_date);
        this.journeyList = Observable.create(observer => {
            this.journeylistObserver = observer;
        });

    }

}