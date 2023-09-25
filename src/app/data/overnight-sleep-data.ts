import { SleepData } from './sleep-data';

export class OvernightSleepData extends SleepData {
	private sleepStart:Date;
	private sleepEnd:Date;
	private totHours:number;
	private totMins:number;
	private percentage:number;

	constructor(sleepStart:Date, sleepEnd:Date) {
		super();
		this.sleepStart = sleepStart;
		this.sleepEnd = sleepEnd;
	}

	summaryString():string {
		var sleepStart_ms = this.sleepStart.getTime();
		var sleepEnd_ms = this.sleepEnd.getTime();

		// Calculate the difference in milliseconds
		var difference_ms = sleepEnd_ms - sleepStart_ms;
		    
		// Convert to hours and minutes
		//return Math.floor(difference_ms / (1000*60*60)) + " hours, " + Math.floor(difference_ms / (1000*60) % 60) + " minutes.";

		this.totHours = Math.floor(difference_ms / (1000*60*60));
		this.totMins = Math.floor(difference_ms / (1000*60) % 60);

		return this.totHours + " hours, " + this.totMins + " minutes.";
	}

	dateString():string {
		return "Night of " + this.sleepStart.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
	}

	getSleepPercentage():number { //used for circle progress bar
		let hoursInMinutes = 0;
		let totalTimeInMinutes = 0;
		if(this.totHours>=8){
			this.percentage = 1;
			return this.percentage;
		} else {
			//convert hours to minutes
			hoursInMinutes  = this.totHours * 60;	

			//add the rest of the minutes to the hoursInMinutes to get total time in minutes
			totalTimeInMinutes = hoursInMinutes + this.totMins;

			//return percentage. use 480 minutes for 8 hours
			this.percentage = ( totalTimeInMinutes / 480 ) * 100;
			this.percentage = this.percentage/100;
			return this.percentage;
		}	
	}

	getProgressBarColor():string {
		if(this.percentage >= 0.75){								
			return "success"; //LimeGreen
		} else if(this.percentage >=0.50) {				
			return "secondary"; //Yellow
		} else if(this.percentage >=0.25) {				
			return "warning"; //Orange
		} else {																
			return "danger"; //Red
		}
	}
}
