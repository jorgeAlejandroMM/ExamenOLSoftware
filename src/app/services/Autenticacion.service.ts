import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../model/Usuario.model';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
import {  Router } from '@angular/router';

// import { auth } from 'firebase/app';



@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  URL:string;
  public usuario:UsuarioModel []=[];

  constructor(private http:HttpClient, 
              private router: Router, 
             ) { 
  this.URL="https://login-86407.firebaseio.com/";
  this.LeerTokenSesion();

}

crearUsuario(usuario:UsuarioModel){
  
  let  temp ={...usuario}
  return this.http.post<UsuarioModel>(`${this.URL}/Usuario.json`, temp)
  .pipe(map((data:object)=>{  
    this.IniciarSesion(data['name']) 
    return data}
    
    ));
}


IniciarSesion(Token:string){
  this.GuardarTokenSesion(Token);
  return this.router.navigate(['/Home']);  
}


GuardarTokenSesion(Token:string){
  localStorage.setItem('idSesion',Token);
  return;
}


ObtenerToken(){
  const idSesion=  localStorage.getItem('idSesion');
  return  idSesion;

}

EliminarTokeSesion(){
  localStorage.removeItem('idSesion');
  this.router.navigate(['Login']);

}

UsuarioActivo():boolean{

    if(this.ObtenerToken()){ 
    return  true  
    }else{
      return false;
    }
  }


LeerTokenSesion(){

 if ( this.ObtenerToken()){
  this.router.navigate(['ListUsuarios']);
  return true;
  }else{
    return false;
  }
}


Login(usuarioParam:UsuarioModel):Observable<any>|any{

  let resul:boolean=false;
  return this.http.get(`${this.URL}/Usuario.json`)
  .pipe(
     map((keyUsuario:object) => {  
    // console.log(keyUsuario==null );
    //valido si existen usuarios en la BD
    if(keyUsuario !=null ){
      //Convierto los objetos de tipo usuarios en un array y los retorno
      //la variable valores hace referencia al id padre de cada usuario
       Object.keys(keyUsuario).forEach(valores=>{
        if ((keyUsuario[valores].correo == usuarioParam.correo) && (keyUsuario[valores].Password == usuarioParam.Password) ){
          //guardamos el objeto en el modelo para no hacer mas consultas 
          //utilizamos el spread
          this.usuario.push(keyUsuario[valores]);
          console.table(this.usuario);
          
          //Guardamos el id padre del objeto usuario
            this.GuardarTokenSesion(valores);
            this.router.navigate(['ListUsuarios']);
            resul=true;
           return; 
         }
       })
      //  console.table(this.usuario);
       return resul;
      }
      return;
      
  }));
}



}
