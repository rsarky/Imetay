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
  appointments: Appointment[]
  currentPatient: Patient
  constructor(private db: FirebaseService) {
    db.getDoctor()
      .subscribe(doc => {
        this.doctor = doc
        console.log(doc)
      })
    db.getAppointmentsForDoctor()
      .subscribe(appointments => {
        // get today's appointments and sort by appointmentTime
        this.appointments = appointments.filter(a => {
            return new Date(a.appointmentTime).toDateString() === new Date().toDateString()
        }).sort((a, b) => {
          return new Date(b.appointmentTime) > new Date(a.appointmentTime) ? -1 : 1
        })
        console.log(this.appointments)
      })
  }

  ngOnInit() {
  }

}