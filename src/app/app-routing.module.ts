import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistryComponent } from './pages/register/register.component';
import { SeguridadSesionGuard } from './security/seguridad-sesion.guard';
import { HomeComponent } from './pages/home/home.component';
import { UsuariosComponent } from './pages/usuarios/ListaUsuarios/usuarios.component';
import { EditarComponent } from './pages/usuarios/editarUsuario/editar.component';
import { NavbarComponent } from './pages/navbar/navbar.component';

const routes: Routes = [
  {
    path:'Login',
    component : LoginComponent
    
  },
  {
    path:'Registro',
    component:RegistryComponent
  },
  // {
  //   path: "Home",
  //   component:HomeComponent,
  //   canActivate: [SeguridadSesionGuard]
    
  // },
  {
    path: "ListUsuarios",
    component:UsuariosComponent,
    canActivate: [SeguridadSesionGuard]
    
  },
  {
  path:'**',
  pathMatch:"full",
  redirectTo:'ListUsuarios'

  }

 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
