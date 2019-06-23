//imports de modulos de angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    NewmedicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
