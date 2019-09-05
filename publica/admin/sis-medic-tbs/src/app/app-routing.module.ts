import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './services/loginUtils/auth.guard';
import {AuthGuardLogin} from './services/loginUtils/auth.guard.login';
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
import { OdontogramaVerComponent } from './odontograma-ver/odontograma-ver.component';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {PerfilComponent} from "./perfil/perfil.component";
import { MyreservationComponent } from './myreservation/myreservation.component';




const routes: Routes = [

  {path: '',canActivate:[AuthGuardLogin], component: LoginComponent},
  {path: 'view-exa',canActivate:[AuthGuard], component: ViewExaComponent},
  {path: 'medic', canActivate:[AuthGuard],component: MedicComponent},
  {path: 'newmedic',canActivate:[AuthGuard], component: NewmedicComponent},
  {path: 'user', canActivate:[AuthGuard],component: UserComponent},
  {path: 'reservations',canActivate:[AuthGuard], component: ReservationsComponent},
  {path: 'menu', canActivate:[AuthGuard],component: MenuComponent},
  {path: 'home',canActivate:[AuthGuard], component: HomeComponent},
  {path: 'newuser',canActivate:[AuthGuard], component: NewUserComponent},
  {path: 'oldreservations',canActivate:[AuthGuard], component: OldReservationsComponent},
  {path: 'patients', canActivate:[AuthGuard],component: PatientsComponent},
  {path: 'newpacient',canActivate:[AuthGuard],component:NewPacientComponent},
  {path: 'add-exa',canActivate:[AuthGuard],component:AddExaComponent},
  {path: "edit-patient", canActivate:[AuthGuard],component:EditPacientComponent},
  {path: 'editmedic',canActivate:[AuthGuard],component:EditmedicComponent},
  {path: "proximamente",canActivate:[AuthGuard], component: ProximamenteComponent},
  {path: 'edit-exa/:id',canActivate:[AuthGuard],component:EditExamenComponent},
  {path: 'ver-examen/:id',canActivate:[AuthGuard],component:VerExamenComponent},
  {path: 'configuration',canActivate:[AuthGuard],component:ConfigurationComponent},
  {path: 'edit-reservation',canActivate:[AuthGuard],component:EditReservationComponent},
  {path: 'add-exa',canActivate:[AuthGuard],component:AddExaComponent},
  {path: 'edit-user',canActivate:[AuthGuard], component:EditUserComponent},
  {path: 'odontograma/:cedula',canActivate:[AuthGuard], component:OdontogramaComponent},
  {path: 'new-reservation',canActivate:[AuthGuard], component:NewReservationComponent},
  {path: 'odontograma-ver/:cedula',canActivate:[AuthGuard], component:OdontogramaVerComponent},
  {path: 'not-found',canActivate:[AuthGuard],component: PageNotFoundComponent},
  {path: 'page-not-found',canActivate:[AuthGuard],component: PageNotFoundComponent},
  {path: 'perfil',canActivate:[AuthGuard],component: PerfilComponent},
  {path: '**',canActivate:[AuthGuard],redirectTo: 'page-not-found'},
  {path: "myReservation/:cedula/:id",canActivate:[AuthGuard], component: MyreservationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
