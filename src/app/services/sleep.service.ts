import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { Observable } from 'rxjs';

import { Storage } from '@ionic/storage-angular';

const OKey = 'overnight';
const SKey = 'sleepiness';

@Injectable({
  providedIn: 'root'
})
export class SleepService {
	private static LoadDefaultData:boolean = false;
	public static AllSleepData:SleepData[] = [];
	public static AllOvernightData:OvernightSleepData[] = [];
	public static AllOvernightData1$: OvernightSleepData[];
	public static RecentOvernightData: OvernightSleepData;
	public static AllSleepinessData:StanfordSleepinessData[] = [];
	public static RecentSleepinessData:StanfordSleepinessData;

	constructor(
				 public AllOvernightDataStorage: Storage,
				 public AllOvernightDataStorage1: Storage,
				 public AllSleepinessDataStorage: Storage,
				) 
	{
		this.init();
		if(SleepService.LoadDefaultData) {
			this.addDefaultData();
			SleepService.LoadDefaultData = false;
	}
	
	}

	async init() {
		this.AllOvernightDataStorage.create();
		this.AllSleepinessDataStorage.create();
	}

	public addDefaultData() {
		this.logOvernightData(new OvernightSleepData(new Date('February 18, 2021 01:03:00'), new Date('February 18, 2021 09:25:00')));
		this.logSleepinessData(new StanfordSleepinessData(4, new Date('February 19, 2021 14:38:00')));
	}


	async logOvernightData(sleepData:OvernightSleepData) {
		//Storage
		const storedData: OvernightSleepData[] = await this.AllOvernightDataStorage.get(OKey) || [];
		storedData.push(sleepData);
		await this.AllOvernightDataStorage.set(OKey, storedData );
	  }
	
	async logSleepinessData(sleepData:StanfordSleepinessData) {
		//Storage
		const storedData: StanfordSleepinessData[] = await this.AllSleepinessDataStorage.get(SKey) || [];
		storedData.push(sleepData);
		return this.AllSleepinessDataStorage.set(SKey, storedData);
	  }
	
}
