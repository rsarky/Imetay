import { Injectable } from '@angular/core'
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { Observable } from 'rxjs'

import { Patient } from '../models/Patient'
import { Appointment } from '../models/Appointment'

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    patientsRef: AngularFireList<any>
    appointmentsRef: AngularFireList<any>
    db: AngularFireDatabase

    constructor(db: AngularFireDatabase) {
        this.db = db
        this.patientsRef = db.list('patients')
        this.appointmentsRef = db.list('appointments')
    }

    registerPatient(patient: Patient) {
        // TODO: Handle duplicate phone numbers in patients.
        let patientData = {
            name: patient.name,
            phoneNumber: patient.phoneNumber,
            numNoShow: patient.numNoShow,
            pastAppointments: patient.pastAppointments
        }
        this.patientsRef.push(patientData)
    }

    calculateWaitingTime() {
        // TODO
        return "dummy"
    }

    createAppointment(appointment: Appointment) {
        appointment.waitingTime = this.calculateWaitingTime()
        let appointmentData = {
            patientUID: appointment.patientUID,
            doctorUID: appointment.doctorUID,
            inTime: appointment.inTime,
            outTime: appointment.outTime,
            waitingTime: appointment.waitingTime,
            ailment: appointment.ailment
        }

        this.appointmentsRef.push(appointmentData)
    }
}