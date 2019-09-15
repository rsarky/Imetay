import { Injectable } from '@angular/core'
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { Observable } from 'rxjs'

import { Patient } from '../models/Patient'

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    patientsRef: AngularFireList<any>
    db: AngularFireDatabase

    constructor(db: AngularFireDatabase) {
        this.db = db
        this.patientsRef = db.list('patients')
    }

    registerPatient(patient: Patient) {
        let patientData = {
            name: patient.name,
            phoneNumber: patient.phoneNumber,
            numNoShow: patient.numNoShow,
            pastAppointments: patient.pastAppointments
        }
        this.patientsRef.push(patientData)
    }
}