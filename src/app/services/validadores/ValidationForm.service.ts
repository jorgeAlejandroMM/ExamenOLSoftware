import { Injectable } from '@angular/core';

import { ValidationErrors, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UsuarioModel } from 'src/app/model/Usuario.model';
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  URL:string;

  constructor(private http:HttpClient) { 
    this.URL="https://login-86407.firebaseio.com";

  }
  

  ValidarsiExisteCorreo(correo?:string):Observable<any>|any{
    let resul:boolean=false;
    return this.http.get(`${this.URL}/Usuario.json`)
    .pipe(
       map((keyUsuario:object) => {  
      // console.log(keyUsuario==null );
      //valido si existen usuarios en la BD
      if(keyUsuario !=null ){
        //Convierto los objetos de tipo usuarios en un array y los retorno
         Object.keys(keyUsuario).forEach(valores=>{
           if ( keyUsuario[valores].correo == correo){
            resul=true;
             return; 
           }
         })
         return resul;
        }
        return;
        
    }));
  }

  
  EmailIguales(control:FormControl): ValidationErrors| null{

    const pass1 = control.get('password');
    const pass2 = control.get('confirmpassword');

    return pass1.value == pass2.value? null: {passNoIguales:true};
  }



}
