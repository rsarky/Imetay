import { Appointment } from './Appointment'
export class Patient {
    uid: string
    name: string
    phoneNumber: string
    numNoShow: number
    pastAppointments: Appointment[]
}