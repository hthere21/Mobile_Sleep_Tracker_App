
import { Component, OnInit } from '@angular/core';
import { SleepService } from '../../services/sleep.service';
import { StanfordSleepinessData } from '../../data/stanford-sleepiness-data';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  dateTimeString:string = new Date().toISOString();
  dateTimeString2:string = new Date(this.dateTimeString).toLocaleString();
  dateTime:Date = new Date(this.dateTimeString);
  degree:number;
  scaleValues: string[];
  sleepinessDataArray: StanfordSleepinessData[];
  recentSleepinessData: StanfordSleepinessData;
  recentSleepinessData2: StanfordSleepinessData;

  constructor(private sleepService:SleepService, public toastController: ToastController) 
  { 
    this.ngOnInit;
    this.recentSleepinessData2 = new StanfordSleepinessData(4, new Date('February 19, 2021 14:38:00'));
  }

  async ngOnInit() {
    await this.sleepService.AllOvernightDataStorage.get("sleepiness").then((res) => { this.recentSleepinessData = res.pop()});
    Object.setPrototypeOf(this.recentSleepinessData, this.recentSleepinessData2);
    this.sleepinessDataArray = SleepService.AllSleepinessData;
  }
  async presentToast(duration_:number) {
    const toast = await this.toastController.create({
      message: 'Your entry has been saved',
      position: 'top',
      color: 'success',
      duration: duration_ 
    });
    toast.present();
  }

  addEntryClicked() {
    this.dateTime = new Date(this.dateTimeString);
    this.dateTimeString2 = new Date(this.dateTimeString).toLocaleString();

    let stanfordSleepinessData:StanfordSleepinessData = new StanfordSleepinessData(this.degree, this.dateTime);
    
    this.sleepService.logSleepinessData(stanfordSleepinessData); 
    this.presentToast(1000);
    this.recentSleepinessData = stanfordSleepinessData;
  }
}

