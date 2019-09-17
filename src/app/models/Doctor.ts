import { Appointment } from './Appointment'
export class Doctor {
    uid: string
    name: string
    email: string
    department: string
    isDoctor: boolean

    constructor(obj) {
        if(obj) {
            this.uid = obj.uid
            this.name = obj.name
            this.email = obj.email
            this.department = obj.department
            this.isDoctor = obj.isDoctor
        }
    }
}