import { Component, OnInit } from '@angular/core'
import { FirebaseService } from '../services/firebase.service'
import { Appointment } from '../models/Appointment'

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit {
  phoneNum: number
  appointment: Appointment
  db: FirebaseService
  constructor(db: FirebaseService) {
    this.db = db
    this.appointment = new Appointment()
  }

  ngOnInit() {
  }

  createAppointment() {
    // TODO add animation
    this.db.createAppointment(this.appointment, this.phoneNum)
    .subscribe(
      (e) => e.then((ref) => console.log("Appointment created")),
      (err) => console.log(err) // TODO error to be handled on UI side.
    )
  }

}
