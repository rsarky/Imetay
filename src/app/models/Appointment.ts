import { Patient } from './Patient';

export class Appointment {
    id: string
    patient: Patient
    doctorUID: string
    appointmentTime: string
    inTime: string
    outTime: string
    waitingTime: string
    ailment: string

    constructor(appt: any = {}) {
        this.id = appt.id || ''
        this.patient = appt.patient
        this.doctorUID = appt.doctorUID
        this.appointmentTime = appt.appointmentTime
        this.inTime = appt.inTime || ''
        this.outTime = appt.outTime || ''
        this.waitingTime = appt.waitingTime
        this.ailment = appt.ailment
    }
}