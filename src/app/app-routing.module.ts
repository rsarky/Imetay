import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PatientViewComponent } from './patient-view/patient-view.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { ReceptionViewComponent } from './reception-view/reception-view.component';
import { DoctorViewComponent } from './doctor-view/doctor-view.component';

const appRoutes = [
  { path: '', component: PatientViewComponent },
  { path: 'user/login', component: LoginSignupComponent },
  { path: 'user/reception', component: ReceptionViewComponent }, // TODO: Add authguard here
  { path: 'user/doctor', component: DoctorViewComponent }, // TODO: Add authguard here.
  { path: '**', component: PatientViewComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
