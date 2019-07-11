//imports de modulos de angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatStepperModule, MatInputModule, MatButtonModule,  MatSelectModule, MatIconModule} from '@angular/material'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


//imports de modulos
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { EstadisticaDonaComponent } from './estadistica-dona/estadistica-dona.component';
import { ViewExaComponent } from './view-exa/view-exa.component';
import { MedicComponent } from './medic/medic.component';
import { NewmedicComponent } from './newmedic/newmedic.component';
import { UserComponent } from './user/user.component';
import { OldReservationsComponent } from './oldreservations/oldreservations.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { PatientsComponent } from './patients/patients.component';
import { NewUserComponent } from './newuser/newuser.component';
import { NewPacientComponent } from './newpacient/newpacient.component';
import { AddExaComponent } from './add-exa/add-exa.component';
import { NewReservationComponent } from './new-reservation/new-reservation.component';
import { EditReservationComponent } from './edit-reservation/edit-reservation.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { EditPacientComponent } from './edit-pacient/edit-pacient.component';
import { EditmedicComponent } from './editmedic/editmedic.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditExamenComponent } from './edit-examen/edit-examen.component';
import { VerExamenComponent } from './ver-examen/ver-examen.component';
import { ProximamenteComponent } from './proximamente/proximamente.component';
import { TallerComponent } from './taller/taller.component';

//servicios
import { DataService } from './data.service';

import { ConfigService } from './view-exa/config.json';
import { FilterExamPipe } from './pipers/filter-exam.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    FooterComponent,
    HomeComponent,
    EstadisticasComponent,
    EstadisticaDonaComponent,
    ViewExaComponent,
    MedicComponent,
    PatientsComponent,
    ReservationsComponent,
    UserComponent,
    NewmedicComponent,
    OldReservationsComponent,
    NewUserComponent,
    NewPacientComponent,
    AddExaComponent,
    NewReservationComponent,
    EditReservationComponent,
    ConfigurationComponent,
    EditPacientComponent,
    EditmedicComponent,
    EditUserComponent,
    EditExamenComponent,
    VerExamenComponent,
    ProximamenteComponent,
    TallerComponent,
    FilterExamPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule, MatInputModule, MatButtonModule,  MatSelectModule, MatIconModule,BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [DataService,ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
