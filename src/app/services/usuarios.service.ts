import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../model/Usuario.model';
import { AutenticacionService } from './autenticacion.service';
import { map } from 'rxjs/operators';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  
  URL:string;
  constructor( private http :HttpClient) { 
    this.URL="https://login-86407.firebaseio.com/";
  }


  
  ObtenerUsuarios():Observable<any>|any{
    let usuario : UsuarioModel[]=[];
  return this.http.get<UsuarioModel>(`${this.URL}/Usuario.json`)
          
          .pipe(map((keyUsuario:object)=>{
  
            Object.keys(keyUsuario).forEach((valores:any)=>{
        
            // delete keyUsuario[valores].id
            let IdJSON=valores;
            let temp={...keyUsuario[valores],IdJSON}
            // console.log(temp);
            usuario.push(temp);
          });
          return usuario;
          // console.table(usuario);
       }));
 
  }


  ActualizarInformacionUser(dataUser:any):Observable<any>{

    //  console.table(dataUser);
    const usuario={
      ...dataUser
    }
    delete usuario.IdJSON;
    return this.http.put<UsuarioModel>(`${this.URL}/Usuario/${dataUser.IdJSON}.json`,usuario);
    
  }


  crearUser(usuario:UsuarioModel):Observable<any>{
  
    let  temp ={...usuario}
    return this.http.post<UsuarioModel>(`${this.URL}/Usuario.json`, temp)
    .pipe(map((data:object)=>{  
      return data}
      
      ));
  }


  eliminarUser(User:string):Observable<any>{
  
    return  this.http.delete(`${this.URL}/Usuario/${User}.json`);
     
     
   }

}
