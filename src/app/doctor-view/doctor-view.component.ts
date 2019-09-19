import { Component, OnInit } from '@angular/core';
import { Doctor } from '../models/Doctor';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs';
import { Appointment } from '../models/Appointment';
import { Patient } from '../models/Patient';

@Component({
  selector: 'app-doctor-view',
  templateUrl: './doctor-view.component.html',
  styleUrls: ['./doctor-view.component.scss']
})
export class DoctorViewComponent implements OnInit {
  doctor: Doctor
  appointments: Appointment[] // all appointments for the day
  pendingAppointments: Appointment[] // all pending appointments for the day (unused for now)
  currentAppointment: Appointment
  isTreating: boolean
  patientsRemaining: boolean
  loading: boolean

  constructor(private db: FirebaseService) {
    this.isTreating = false
    this.loading = true
    db.getDoctor()
      .subscribe(doc => {
        this.doctor = doc
        console.log(doc)
      })
    db.getAppointmentsForDoctor()
      .subscribe(appointments => {
        // get today's appointments and sort by appointmentTime
        this.loading = false
        this.appointments = appointments.filter(a => {
            return new Date(a.appointmentTime).toDateString() === new Date().toDateString() && !a.outTime
        }).sort((a, b) => {
          return new Date(b.appointmentTime) > new Date(a.appointmentTime) ? -1 : 1
        })
        if(this.appointments.length !== 0) {
          this.patientsRemaining = true
          this.currentAppointment = this.appointments[0]
          if(this.currentAppointment.inTime && new Date(this.currentAppointment.inTime) < new Date()) {
            this.isTreating = true
          }
          console.log(this.currentAppointment)
        } else {
          this.patientsRemaining = false
          this.currentAppointment = null
        }
      })
  }

  ngOnInit() {
  }

  startAppointment() {
// TODO. Add intime in appointment.

    this.db.startAppointment(this.currentAppointment.id).then(_ => {
      this.isTreating = true
      console.log('Appointment started')
    })
  }

  completeAppointment() {
// TODO. Add outtime in appointment and a completed flag.
    this.db.completeAppointment(this.currentAppointment.id).then(_ => {
      this.isTreating = false
      console.log('Appointment completed')
    })
  }

}