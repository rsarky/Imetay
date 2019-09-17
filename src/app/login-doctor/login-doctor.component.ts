import { Component, OnInit } from '@angular/core';
import { Doctor } from '../models/Doctor';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-login-doctor',
  templateUrl: './login-doctor.component.html',
  styleUrls: ['./login-doctor.component.scss']
})
export class LoginDoctorComponent implements OnInit {

  password: string
  doctor: Doctor
  auth: AuthService
  db: FirebaseService

  constructor(auth: AuthService, db: FirebaseService) { 
    this.auth = auth
    this.db = db
  }

  ngOnInit() {
  }
}
