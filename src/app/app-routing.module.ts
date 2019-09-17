import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard'
import { PatientViewComponent } from './patient-view/patient-view.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { ReceptionViewComponent } from './reception-view/reception-view.component';
import { DoctorViewComponent } from './doctor-view/doctor-view.component';

// TODO: Handle Authguards properly. Doctor shouldnt be able to view reception view and vice versa.
const appRoutes = [
  { path: 'user/login', component: LoginSignupComponent },
  { path: 'user/reception', component: ReceptionViewComponent }, // TODO: Add authguard here
  { path: 'user/doctor', component: DoctorViewComponent, canActivate: [AngularFireAuthGuard] }, // TODO: Add authguard here.
  { path: '', component: PatientViewComponent },
  { path: '**', redirectTo: '', component: PatientViewComponent }
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
