import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//rutas personalizadas
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ViewExaComponent } from './view-exa/view-exa.component';
import { MedicComponent } from './medic/medic.component';
import { NewmedicComponent } from './newmedic/newmedic.component';
import { UserComponent } from './user/user.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { OldReservationsComponent } from './oldreservations/oldreservations.component';
import { PatientsComponent } from './patients/patients.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'view_exa', component: ViewExaComponent},
  {path: 'medic', component: MedicComponent},
  {path: 'newmedic', component: NewmedicComponent},
  {path: 'user', component: UserComponent},
  {path: 'reservations', component: ReservationsComponent},
  {path: 'home', component: HomeComponent},
  {path: 'oldreservations', component: OldReservationsComponent},
  {path: 'patients', component: PatientsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
