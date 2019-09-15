import { Appointment } from './Appointment'
export class Patient {
    name: string
    phoneNumber: string
    numNoShow: number
    pastAppointments: Appointment[]

    constructor() {
        this.numNoShow = 0
        this.pastAppointments = null
    }
}