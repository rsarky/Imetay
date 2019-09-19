import { Injectable } from '@angular/core'
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { Observable, concat } from 'rxjs'

import { Patient } from '../models/Patient'
import { Appointment } from '../models/Appointment'
import { Doctor } from '../models/Doctor'
import { AngularFireAuth } from '@angular/fire/auth';
import { map, single, take, catchError, first, concatAll, tap, merge, concatMap } from 'rxjs/operators'
import { AuthService } from './auth.service';
import { isPending } from 'q';

const appointmentDuration = 1800000 // in ms
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

    /* Returns patient id given a phone number*/
    getPatientFromPhone(phoneNumber: number): Observable<Patient> {
        let data
        return this.db.list('/patients', ref => ref.orderByChild('phoneNumber').equalTo(phoneNumber))
            .snapshotChanges()
            .pipe(
                first(),
                map(s => {
                    if (!s.length) throw 'No patient associated with the given phone number'
                    return new Patient(s[0].payload.val())
                })
            )
    }

    findInTime(appointment: Appointment): Observable<string> {
        let pendingAppointments
        return this.getAppointmentsFromDoctorUid(appointment.doctorUID).pipe(
            take(1),
            map((appointments) => {
                console.log("called")
                pendingAppointments = appointments.filter(a => new Date(a.appointmentTime).toDateString() === new Date().toDateString() && !a.outTime)
                console.log(pendingAppointments)
                let waitingTime = pendingAppointments ? pendingAppointments.length * appointmentDuration : 0
                return new Date(new Date().getTime() + waitingTime).toString()
            })
        )
    }

    // map(appointments => {
    //     pendingAppointments = appointments.filter(a => {
    //         return new Date(a.appointmentTime).toDateString() === new Date().toDateString() && !a.outTime
    //     })
    //     let waitingTime = pendingAppointments ? pendingAppointments.length * appointmentDuration : 0
    //     return new Date(new Date().getTime() + waitingTime).toString()
    // })
    createAppointment(appointment: Appointment, phoneNumber: number): Observable<Promise<any>> {
        appointment.appointmentTime = new Date().toString()
        let appointmentData = {
            doctorUID: appointment.doctorUID, // Passed from UI
            appointmentTime: appointment.appointmentTime,
            ailment: appointment.ailment
        }

        // this.getPatientFromPhone(phoneNumber).subscribe((id) => {
        //     appointmentData['patientUID'] = id
        // }, (err) => { throw (err) }
        // )
        // return this.appointmentsRef.push(appointmentData)
        return this.findInTime(appointment).pipe(
            map(str => {
                appointmentData['expInTime'] = str
            }),
            concatMap(_ => this.getPatientFromPhone(phoneNumber).pipe(
                map((patient) => {
                    appointmentData['patient'] = patient
                    return this.appointmentsRef.push(appointmentData).then(snap => this.setAppKey(snap.key))
                })
            ))
        )
    }

    setAppKey(key: string) {
        return this.appointmentsRef.update(key, { id: key })
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


    startAppointment(appId: string) {
        return this.appointmentsRef.update(appId, { inTime: new Date().toString() })
    }

    updateWaitingTimes() {
        return this.getAppointmentsForDoctor().pipe(
            take(1),
            map(appointments => {
                return appointments.filter(a => {
                    return new Date(a.appointmentTime).toDateString() === new Date().toDateString() && !a.outTime
                }).sort((a, b) => {
                    return new Date(b.appointmentTime) > new Date(a.appointmentTime) ? -1 : 1
                })
            }),
            map(pending => {
                let total = 0
                for(let i=0;i<pending.length;i++) {
                    pending[i].expInTime =  new Date(new Date().getTime() + i*appointmentDuration).toString()
                }
                console.log(pending)
                return pending
            }),
            map(updates => {
                return updates.map(a => {
                    return this.appointmentsRef.update(a.id, a)
                })
            }),
            map(promises => Promise.all(promises))
        ).toPromise()
    }

    completeAppointment(appId: string) {
        return this.appointmentsRef.update(appId, { outTime: new Date().toString() }).then(_ => this.updateWaitingTimes())        
    }
}