import { Component, OnInit } from '@angular/core'
import { FirebaseService } from '../services/firebase.service'
import { Appointment } from '../models/Appointment'
import { Doctor } from '../models/Doctor';
import { of, from } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { DEFAULT_NOASSERT } from 'bytebuffer';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit {
  phoneNum: number
  docName: string
  selectedName: string
  appointment: Appointment
  doctors: any
  matchedDoctors: any
  db: FirebaseService
  done: boolean
  inProgress: boolean
  constructor(db: FirebaseService) {
    this.done = false
    this.inProgress = false
    this.db = db
    this.appointment = new Appointment()
  }

  ngOnInit() {
    this.db.getDoctors().subscribe((docs) => {
      this.doctors = docs
    })
  }

  createAppointment() {
    // TODO add animation
    this.inProgress = true
    this.appointment.doctorUID = this.doctors.filter((doctor) => {
      return doctor.name === this.selectedName
    })[0].id
    this.db.createAppointment(this.appointment, this.phoneNum)
      .subscribe(
        (e) => e.then(_ => {
          console.log("Appointment created")
          this.inProgress = false
          this.done = true
        }), // TODO error to be handled on UI side.
        e => console.log(e)
      )
  }

  doFilter() {
    // TODO Better way to populate the doctors array? Or add some animation while doctors load.
    if (this.doctors) {
      this.matchedDoctors = of(this.doctors).pipe(
        map((doctorArr) => {
          return doctorArr.filter(doctor => this.filterName(doctor.name))
        })
      )
    }
  }

  filterName(name: string): boolean {
    let temp = this.docName // Once a value is selected docName is assigned the id of the doc. Don't want to make that lower case.
    return name.toLowerCase().includes(temp.toLowerCase())
  }

  // The 2 functions below force user to select one among the given name options
  nameSelected(name) {
    this.selectedName = name
  }

  checkName() {
    if(!this.selectedName || this.selectedName !== this.docName) {
      this.docName = ''
      this.selectedName = ''
    }
  }

}
