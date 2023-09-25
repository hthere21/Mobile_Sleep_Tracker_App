import { Component, OnInit } from '@angular/core';
import { SleepService } from '../../services/sleep.service';
import { OvernightSleepData  } from '../../data/overnight-sleep-data';
import { ToastController } from '@ionic/angular';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  recentOvernightSleepData: OvernightSleepData;
  recentOvernightSleepData2: OvernightSleepData;
  startDateTimeString:string = new Date().toISOString();
  endDateTimeString:string = new Date().toISOString();
  startDateTime:Date = new Date(this.startDateTimeString);
  endDateTime:Date = new Date(this.endDateTimeString);


  constructor(private sleepService: SleepService, public toastController: ToastController) 
  {
    this.ngOnInit;
    this.recentOvernightSleepData2 = new OvernightSleepData(new Date('February 18, 2021 01:03:00'), new Date('February 18, 2021 09:25:00'));
    console.log(this.recentOvernightSleepData2);
    console.log(this.recentOvernightSleepData);
  }

  async ngOnInit() {
    await this.sleepService.AllOvernightDataStorage.get("overnight").then((res) => { this.recentOvernightSleepData = res.pop()});
    Object.setPrototypeOf(this.recentOvernightSleepData, this.recentOvernightSleepData2);
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

  async addEntryClicked() {
    this.startDateTime = new Date(this.startDateTimeString);
    this.endDateTime = new Date(this.endDateTimeString);
    let overnightSleepData: OvernightSleepData = new OvernightSleepData(this.startDateTime, this.endDateTime);
   
    this.sleepService.logOvernightData(overnightSleepData);
    
    this.presentToast(1000);
    this.recentOvernightSleepData = overnightSleepData;
  }
}
