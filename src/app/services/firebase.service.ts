import { Injectable } from '@angular/core'
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { Observable } from 'rxjs'

import { Patient } from '../models/Patient'
import { Appointment } from '../models/Appointment'
import { Doctor } from '../models/Doctor'
import { AngularFireAuth } from '@angular/fire/auth';
import { map, single, take, catchError, first, concatAll } from 'rxjs/operators'
import { AuthService } from './auth.service';
@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    patientsRef: AngularFireList<any>
    appointmentsRef: AngularFireList<any>
    usersRef: any

    constructor(private db: AngularFireDatabase, private auth: AuthService) {
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
        appointment.appointmentTime = new Date().toString()
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

    isDoctor(): Observable<boolean> {
        return this.auth.userObservable().pipe(
            map(user => this.uidToDoctor(user.uid)),
            concatAll(),
            map(doctor => doctor.isDoctor)
        )
    }

    uidToDoctor(uid: string): Observable<Doctor> {
        return this.db.object('/users/' + uid).valueChanges().pipe(
            map(user => user as Doctor)
        )
    }

    getDoctor(): Observable<Doctor> {
        return this.auth.userObservable().pipe(
            map(user => this.uidToDoctor(user.uid)),
            concatAll(),
            map(obj => obj as Doctor)
        )
    }

    // Gets all appointments for doctor with given uid.
    getAppointmentsFromDoctorUid(uid: string): Observable<Appointment[]> {
        return this.db.list('/appointments', ref => ref
            .orderByChild('doctorUID')
            .equalTo(uid)).valueChanges().pipe(
                map(arr => {
                    return arr.map(appt => new Appointment(appt))
                })
            )
    }

    getAppointmentsForDoctor(): Observable<Appointment[]> {
        return this.auth.userObservable().pipe(
            map(user => this.getAppointmentsFromDoctorUid(user.uid)),
            concatAll()
        )
    }
}