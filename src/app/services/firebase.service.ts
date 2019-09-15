import { Injectable } from '@angular/core'
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { Observable } from 'rxjs'

import { Patient } from '../models/Patient'
import { Appointment } from '../models/Appointment'
import { Doctor } from '../models/Doctor'
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    patientsRef: AngularFireList<any>
    appointmentsRef: AngularFireList<any>
    usersRef: any
    db: AngularFireDatabase

    constructor(db: AngularFireDatabase) {
        this.db = db
        this.patientsRef = db.list('patients')
        this.appointmentsRef = db.list('appointments')
        this.usersRef = db.list('users') // receptionist and doctors
    }

    registerPatient(patient: Patient): firebase.database.ThenableReference {
        // TODO: Handle duplicate phone numbers in patients.
        let patientData = {
            name: patient.name,
            phoneNumber: patient.phoneNumber,
            numNoShow: patient.numNoShow,
            pastAppointments: patient.pastAppointments
        }
        return this.patientsRef.push(patientData)
    }

    calculateWaitingTime() {
        // TODO
        return "dummy"
    }

    createAppointment(appointment: Appointment): firebase.database.ThenableReference {
        appointment.waitingTime = this.calculateWaitingTime()
        appointment.appointmentTime = new Date().toDateString()
        let appointmentData = {
            patientUID: appointment.patientUID,
            doctorUID: appointment.doctorUID,
            appointmentTime: appointment.appointmentTime,
            inTime: appointment.inTime,
            outTime: appointment.outTime,
            waitingTime: appointment.waitingTime,
            ailment: appointment.ailment
        }

        return this.appointmentsRef.push(appointmentData)
    }

    addDoctor(doctor: Doctor, uid: string): firebase.database.ThenableReference {
        let doctorData = {
            name: doctor.name,
            email: doctor.email,
            department: doctor.department,
            appointments: null,
            isDoctor: true
        }

        return this.usersRef.set(uid, doctorData)
    }
}