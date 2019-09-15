import { Component, OnInit } from '@angular/core';
import { Patient } from '../models/Patient'
import { FirebaseService } from '../services/firebase.service'

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit {

  patient: Patient
  db: FirebaseService

  constructor(db: FirebaseService) {
    this.patient = new Patient()
    this.db = db
  }

  ngOnInit() {
  }

  onRegister() {
    // TODO : Add some animation here.
    this.db.registerPatient(this.patient)
    this.patient = new Patient()
  }

}
