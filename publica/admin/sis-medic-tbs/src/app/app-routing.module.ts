import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//rutas personalizadas
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ViewExaComponent } from './view-exa/view-exa.component';
import { MedicComponent } from './medic/medic.component';
import { NewmedicComponent } from './newmedic/newmedic.component';
import { UserComponent } from './user/user.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { OldReservationsComponent } from './oldreservations/oldreservations.component';
import { NewUserComponent } from './newuser/newuser.component';
import { PatientsComponent } from './patients/patients.component';
import { NewPacientComponent } from './newpacient/newpacient.component';
import { AddExaComponent } from './add-exa/add-exa.component';
import { EditPacientComponent } from './edit-pacient/edit-pacient.component';
import { EditmedicComponent } from './editmedic/editmedic.component';
import { EditExamenComponent } from './edit-examen/edit-examen.component';
import { VerExamenComponent } from './ver-examen/ver-examen.component';
import { EditReservationComponent } from './edit-reservation/edit-reservation.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { NewReservationComponent} from './new-reservation/new-reservation.component';
import { ProximamenteComponent } from './proximamente/proximamente.component';
import { OdontogramaComponent } from './odontograma/odontograma.component';
import { OdontogramanewComponent } from './odontogramanew/odontogramanew.component';
import {CitasmedicoComponent} from './citasmedico/citasmedico.component';



const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'view-exa', component: ViewExaComponent},
  {path: 'medic', component: MedicComponent},
  {path: 'newmedic', component: NewmedicComponent},
  {path: 'user', component: UserComponent},
  {path: 'reservations', component: ReservationsComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'home', component: HomeComponent},
  {path: 'newuser', component: NewUserComponent},
  {path: 'oldreservations', component: OldReservationsComponent},
  {path: 'patients', component: PatientsComponent},
  {path: 'newpacient',component:NewPacientComponent},
  {path: 'add-exa',component:AddExaComponent},
  {path: "edit-patient", component:EditPacientComponent},
  {path: 'editmedic',component:EditmedicComponent},
  {path: "proximamente", component: ProximamenteComponent},
  {path: 'edit-exa',component:EditExamenComponent},
  {path: 'ver-examen',component:VerExamenComponent},
  {path: 'configuration',component:ConfigurationComponent},
  {path: 'edit-reservation',component:EditReservationComponent},
  {path: 'add-exa',component:AddExaComponent},
  {path: 'edit-user',component:EditUserComponent},
  {path: 'new-reservation', component:NewReservationComponent},
  {path: 'not-found',component: ProximamenteComponent},
  {path: 'odontograma',component: OdontogramaComponent},
  {path: 'odontogramanew',component:OdontogramanewComponent},
  {path: 'citasmedico',component:CitasmedicoComponent},
  {path: '#',redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
