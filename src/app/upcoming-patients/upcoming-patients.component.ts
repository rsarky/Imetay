import { Component, OnInit, Input } from '@angular/core';
import { Appointment } from '../models/Appointment';

@Component({
  selector: 'app-upcoming-patients',
  templateUrl: './upcoming-patients.component.html',
  styleUrls: ['./upcoming-patients.component.scss']
})
export class UpcomingPatientsComponent implements OnInit {

  @Input()
  appointments: Appointment[]
  constructor() {

   }

  ngOnInit() {
    console.log("Upcoming " + this.appointments.length)
  }

}
