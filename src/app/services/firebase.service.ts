import { Injectable } from '@angular/core'
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { Observable } from 'rxjs'

import { Patient } from '../models/Patient'
import { Appointment } from '../models/Appointment'
import { Doctor } from '../models/Doctor'
import { AngularFireAuth } from '@angular/fire/auth';
import { map, single, take, catchError, first } from 'rxjs/operators'
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

    /* Returns patient id given a phone number*/
    getPatientFromPhone(phoneNumber: number): Observable<string> {
        let data
        return this.db.list('/patients', ref => ref.orderByChild('phoneNumber').equalTo(phoneNumber))
            .snapshotChanges()
            .pipe(
                first(),
                map(s => {
                    if (!s.length) throw 'No patient associated with the given phone number'
                    return s[0].key
                })
            )
    }

    createAppointment(appointment: Appointment, phoneNumber: number): Observable<firebase.database.ThenableReference> {
        appointment.waitingTime = this.calculateWaitingTime()
        appointment.appointmentTime = new Date().toDateString()
        let appointmentData = {
            doctorUID: appointment.doctorUID, // Passed from UI
            appointmentTime: appointment.appointmentTime,
            waitingTime: appointment.waitingTime,
            ailment: appointment.ailment
        }

        // this.getPatientFromPhone(phoneNumber).subscribe((id) => {
        //     appointmentData['patientUID'] = id
        // }, (err) => { throw (err) }
        // )
        // return this.appointmentsRef.push(appointmentData)
        return this.getPatientFromPhone(phoneNumber).pipe(
            map((id) => {
                appointmentData['patientUID'] = id
                return this.appointmentsRef.push(appointmentData)
            })
        )

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

    getDoctors(): Observable<any> { // TODO define type
        return this.db.list('/users', ref => ref.orderByChild('isDoctor').equalTo(true))
        .snapshotChanges()
        .pipe(
            map((snapshot) => {
                return snapshot.map((doc) => {
                    return {
                        "name": (doc.payload.val() as any).name,
                        "id": doc.key
                    }
                })
            })
        )
    }
}