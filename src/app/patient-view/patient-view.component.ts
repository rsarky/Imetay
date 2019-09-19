import { Component, OnInit } from '@angular/core';
import { Doctor } from '../models/Doctor';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.scss']
})
export class PatientViewComponent implements OnInit {

  doctors: Observable<{name: string, id: string}[]>

  constructor(private db: FirebaseService) {
    // this.db.getDoctors().subscribe(doctors => {
    //   this.doctors = doctors
    //   console.log(doctors)
    // })
    this.doctors = this.db.getDoctors()
  }

  ngOnInit() {
  }

}
