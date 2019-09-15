import { Appointment } from './Appointment'
export class Doctor {
    uid: string
    name: string
    email: string
    department: string
    appointments: Appointment[]
}