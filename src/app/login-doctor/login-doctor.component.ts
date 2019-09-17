import { Component, OnInit } from '@angular/core';
import { Doctor } from '../models/Doctor';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-doctor',
  templateUrl: './login-doctor.component.html',
  styleUrls: ['./login-doctor.component.scss']
})
export class LoginDoctorComponent implements OnInit {

  email: string
  password: string
  doctor: Doctor

  constructor(private auth: AuthService, private db: FirebaseService, private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    this.auth.emailLogin(this.email, this.password)
      .then(_ => {
        console.log('User logged in')
        this.auth.isDoctor().subscribe(isDoctor => {
          console.log(isDoctor)
          if(isDoctor) {
            this.router.navigate(['/user/doctor'])
          } else {
            this.router.navigate(['/user/reception'])
          }
        })
      })
      .catch(e => console.log(e)) // TODO Show error on incorrect user id pass.
  }
}
