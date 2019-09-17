export class Appointment {
    patientUID: string
    doctorUID: string
    appointmentTime: string
    inTime: string
    outTime: string
    waitingTime: string
    ailment: string

    constructor(appt: any = {}) {
        this.patientUID = appt.patientUID
        this.doctorUID = appt.doctorUID
        this.appointmentTime = appt.appointmentTime
        this.inTime = appt.inTime || ''
        this.outTime = appt.outTime || ''
        this.waitingTime = appt.waitingTime
        this.ailment = appt.ailment
    }
}