//imports de modulos de angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
    AddExaComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
