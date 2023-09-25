import { Component, OnInit } from '@angular/core';
import { SleepService } from '../../services/sleep.service';
import { StanfordSleepinessData } from '../../data/stanford-sleepiness-data';
import { OvernightSleepData } from '../../data/overnight-sleep-data';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  recentOvernightSleepData3: OvernightSleepData;
  recentSleepinessData2: StanfordSleepinessData;
  overnightSleepDataArray: OvernightSleepData[] =[];
  overnightSleepDataArray2: OvernightSleepData[] = [];
  sleepinessDataArray: StanfordSleepinessData[] =[];
  showSleepDataCards: boolean;
  showSleepinessDataCards: boolean;

  constructor(private sleepService:SleepService) { 
    this.recentOvernightSleepData3 = new OvernightSleepData(new Date('February 18, 2021 01:03:00'), new Date('February 18, 2021 09:25:00'));
    this.recentSleepinessData2 = new StanfordSleepinessData(4, new Date('February 19, 2021 14:38:00'));
    this.ngOnInit;
    this.showSleepDataCards = true;
    this.showSleepinessDataCards = false;
  }

  async ngOnInit() {
  }

  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      location.reload();
      event.target.complete();
    }, 1000);
  };


async  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    console.log("event.detail.value: " + ev.detail.value);
    if(ev.detail.value=="sleepData") {
      console.log("show sleep data!");
      this.showSleepDataCards = true; 
      this.showSleepinessDataCards = false;
    } else if (ev.detail.value=="sleepinessData"){
      console.log("show sleepiness data!");
      this.showSleepDataCards = false;
      this.showSleepinessDataCards = true;
    }
  }

  async ionViewWillEnter() {
    this.overnightSleepDataArray2=[];
    this.sleepinessDataArray=[];
    await this.sleepService.AllOvernightDataStorage.get("overnight").then((res) => { res.forEach((value) => this.overnightSleepDataArray2.push(value))
    });
    this.overnightSleepDataArray2.forEach((value) => Object.setPrototypeOf(value,this.recentOvernightSleepData3));
    console.log(this.overnightSleepDataArray2);
    //asdcsaca
    await this.sleepService.AllOvernightDataStorage.get("sleepiness").then((res) => { res.forEach((value) => this.sleepinessDataArray.push(value))
    });
    this.sleepinessDataArray.forEach((value) => Object.setPrototypeOf(value,this.recentSleepinessData2));
    console.log(this.sleepinessDataArray);
  }

}
