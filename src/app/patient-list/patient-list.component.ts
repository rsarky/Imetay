import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../models/Patient';
import { FirebaseService } from '../services/firebase.service';
import { Appointment } from '../models/Appointment';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  @Input()
  doctor: { name: string, id: string }
  appointments: Appointment[]
  constructor(private db: FirebaseService) {
    console.log(this.doctor)
    // 
  }

  ngOnInit() {
    console.log(this.doctor)
    this.db.getAppointmentsFromDoctorUid(this.doctor.id).subscribe(appointments => { // TODO: Don't get all appointments :p
      // get today's appointments and sort by appointmentTime
      console.log(appointments.length)
      this.appointments = appointments.filter(a => {
        return new Date(a.appointmentTime).toDateString() === new Date().toDateString() && !a.outTime
      }).sort((a, b) => {
        return new Date(b.appointmentTime) > new Date(a.appointmentTime) ? -1 : 1
      })
      this.appointments.forEach(a => {
        let h = new Date(a.expInTime).getHours()
        let m = new Date(a.expInTime).getMinutes()
        a.expInTime = h + " : " + m
      })
      // if(this.appointments.length !== 0) {
      //   this.patientsRemaining = true
      //   this.currentAppointment = this.appointments[0]
      //   if(this.currentAppointment.inTime && new Date(this.currentAppointment.inTime) < new Date()) {
      //     this.isTreating = true
      //   }
      //   console.log(this.currentAppointment)
      // } else {
      //   this.patientsRemaining = false
      //   this.currentAppointment = null
      // }
    })
  }

}
