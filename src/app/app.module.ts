import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire'
import { environment } from '../environments/environment'
import { AngularFireDatabaseModule } from '@angular/fire/database'

import { AppComponent } from './app.component';
import { PatientFormComponent } from './patient-form/patient-form.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Angular material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatCheckboxModule, MatAccordion } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { FirebaseService } from './services/firebase.service';
import { LoginSignupComponent } from './login-signup/login-signup.component'
import { AuthService } from './services/auth.service';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { PatientViewComponent } from './patient-view/patient-view.component';
import { ReceptionViewComponent } from './reception-view/reception-view.component';
import { DoctorViewComponent } from './doctor-view/doctor-view.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientFormComponent,
    AppointmentFormComponent,
    LoginSignupComponent,
    PatientViewComponent,
    ReceptionViewComponent,
    DoctorViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule
  ],
  providers: [
    FirebaseService,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
