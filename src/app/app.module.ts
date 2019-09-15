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

import { FirebaseService } from './services/firebase.service'

@NgModule({
  declarations: [
    AppComponent,
    PatientFormComponent,
    AppointmentFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
  ],
  providers: [
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
