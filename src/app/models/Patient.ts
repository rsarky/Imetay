import { Appointment } from './Appointment'
export class Patient {
    uid: string
    name: string
    phoneNumber: string
    numNoShow: number
    pastAppointments: Appointment[]

    constructor() {
        this.numNoShow = 0
        this.pastAppointments = null
    }
}