import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire'
import { environment } from '../environments/environment'
import { AngularFireDatabaseModule } from '@angular/fire/database'

import { AppComponent } from './app.component';
import { PatientFormComponent } from './patient-form/patient-form.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
// Angular material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatCheckboxModule, MatAccordion } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';


import { FirebaseService } from './services/firebase.service';
import { LoginSignupComponent } from './login-signup/login-signup.component'
import { AuthService } from './services/auth.service';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { PatientViewComponent } from './patient-view/patient-view.component';
import { ReceptionViewComponent } from './reception-view/reception-view.component';
import { DoctorViewComponent } from './doctor-view/doctor-view.component';
import { HeaderComponent } from './header/header.component';
import { LoginDoctorComponent } from './login-doctor/login-doctor.component';
import { RegisterDoctorComponent } from './register-doctor/register-doctor.component';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { UpcomingPatientsComponent } from './upcoming-patients/upcoming-patients.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { PatientListComponent } from './patient-list/patient-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientFormComponent,
    AppointmentFormComponent,
    LoginSignupComponent,
    PatientViewComponent,
    ReceptionViewComponent,
    DoctorViewComponent,
    HeaderComponent,
    LoginDoctorComponent,
    RegisterDoctorComponent,
    UpcomingPatientsComponent,
    PatientListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MatDividerModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireAuthGuardModule,
    HttpClientModule
  ],
  providers: [
    FirebaseService,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
