import { Component, OnInit } from '@angular/core';
import { Doctor } from '../models/Doctor';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-doctor',
  templateUrl: './register-doctor.component.html',
  styleUrls: ['./register-doctor.component.scss']
})
export class RegisterDoctorComponent implements OnInit {
  password: string
  doctor: Doctor
  auth: AuthService
  db: FirebaseService

  constructor(auth: AuthService, db: FirebaseService, private router: Router) { 
    this.doctor = new Doctor({})
    this.auth = auth
    this.db = db
  }

  ngOnInit() {
  }

  doctorSignup() {
    this.auth.emailSignup(this.doctor.email, this.password)
    .then((cred) => {
      console.log(cred)
      this.db.addDoctor(this.doctor, cred.user.uid)
      this.router.navigate(['/user/doctor'])
    })
    .catch((e) => {
      console.log(e)
    })
  }

}
