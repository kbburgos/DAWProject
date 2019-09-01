// imports de modulos de angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import {
  MatStepperModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatIconModule,
  MatExpansionModule, MatCheckboxModule, MatRadioModule, MatCardModule
} from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/loginUtils/auth.service';
import {AllServices} from './services/AllServices'
import {AuthGuard} from './services/loginUtils/auth.guard';
import {AuthGuardLogin} from './services/loginUtils/auth.guard.login';
import { DataService } from "./services/data.services";
import { TokenInterceptorService } from './services/loginUtils/token-interceptor';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule}  from '@angular/material/';
// imports de modulos
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
import { SnackMessageComponent } from './snack-message/snack-message.component';
import { DialogService } from './services/dialogService'
import {MatSnackBarModule} from '@angular/material/snack-bar';
// servicios
//import { DataService } from './data.service';
import { AutonomoService } from './autonomo.service';
import { OdontogramaService } from './services/odontograma.service';


import { ConfigService } from './view-exa/config.json';
import { FilterExamPipe } from './pipers/filter-exam.pipe';
import { OdontogramaComponent } from './odontograma/odontograma.component';
import { OdontogramanewComponent } from './odontogramanew/odontogramanew.component';
import { OdontogramaVerComponent } from './odontograma-ver/odontograma-ver.component';
import { CitasmedicoComponent } from './citasmedico/citasmedico.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PerfilComponent } from './perfil/perfil.component';



@NgModule({
  declarations: [
    SnackMessageComponent,
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
    FilterExamPipe,
    OdontogramaComponent,
    OdontogramanewComponent,
    CitasmedicoComponent,
    OdontogramaVerComponent,
    PageNotFoundComponent,
    PerfilComponent
  ],

  imports: [
    NgxDaterangepickerMd.forRoot(),
    BrowserModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule, MatInputModule, MatButtonModule,  MatSelectModule, MatIconModule, BrowserAnimationsModule,
    HttpClientModule,
    ConfirmationPopoverModule.forRoot({
      
      confirmButtonType: 'danger' // set defaults here
    }),
    MatStepperModule, MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, BrowserAnimationsModule,
    HttpClientModule, MatExpansionModule, MatCheckboxModule, MatRadioModule, MatCardModule
  ],
  entryComponents:[SnackMessageComponent],
  providers: [DataService, ConfigService, AuthService, TokenInterceptorService, AuthGuard, AuthGuardLogin,AllServices,DataService,DialogService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }, AutonomoService, OdontogramaService],
   
  bootstrap: [AppComponent]
})
export class AppModule { }
