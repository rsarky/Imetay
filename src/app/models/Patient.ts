import { Appointment } from './Appointment'
export class Patient {
    name: string
    phoneNumber: string
    numNoShow: number
    pastAppointments: Appointment[]

    constructor(obj?: any) {
        this.name = obj && obj.name || null
        this.numNoShow = obj && obj.numNoShow || 0
        this.pastAppointments = obj && obj.pastAppointments || null
        this.phoneNumber = obj && obj.phoneNumber || null
    }
}