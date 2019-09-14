import { Appointment } from './Appointment'
export class Doctor {
    uid: string
    upcomingAppointments: Appointment[]
    pastAppointments: Appointment[]
}