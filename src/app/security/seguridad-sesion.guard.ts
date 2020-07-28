import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable} from 'rxjs';

import {AutenticacionService}from '../services/autenticacion.service';
@Injectable({
  providedIn: 'root'
})
export class SeguridadSesionGuard implements CanActivate {
  
  constructor(private ServiceAuth:AutenticacionService, private router :Router){}
 
  canActivate():boolean  {
    const UsuarioActivo= this.ServiceAuth.UsuarioActivo();
     
    if(localStorage.getItem('idSesion')){
      // this.router.navigate(['ListUsuarios']);

      return true 
   }else if(localStorage.getItem('idSesion')==null){
    this.router.navigate(['Login']);
      return false;
    }
  }
  
}
