import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegistryComponent } from './pages/register/register.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { EditarComponent } from './pages/usuarios/editarUsuario/editar.component';
import {UsuariosComponent} from './pages/usuarios/ListaUsuarios/usuarios.component';

// libreria para el filtro de busqueda
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports:[ 
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
     FormsModule, 
     AppRoutingModule ,
     ReactiveFormsModule,
     HttpClientModule,
     Ng2SearchPipeModule,
     ClarityModule,
    ],
  
     declarations: [ 
          LoginComponent,
          RegistryComponent,
          NavbarComponent,
          EditarComponent,
          UsuariosComponent,
          AppComponent, 
           
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
