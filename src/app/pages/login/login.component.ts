import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validator, Validators} from '@angular/forms'
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { UsuarioModel } from 'src/app/model/Usuario.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:UsuarioModel =new UsuarioModel();
  formGroup:FormGroup;
  constructor( private formBuilder:FormBuilder,
                 private ServiceAuth:AutenticacionService, 
                 ) {
    this.ValidaRFormulario();
   }

  ngOnInit(): void {
    this.usuario.correo= "Karol@gmail.com";
    this.usuario.Password="0514";
   
  }

 

  get ValidarCorreo(){
    
    const Controlcorreo=this.formGroup.get('correo');
    return  Controlcorreo.invalid &&  Controlcorreo.touched  
   }

   get ValidarPassword(){

    return  this.formGroup.get('password').invalid &&  this.formGroup.get('password').touched 
   }

  

  ValidaRFormulario(){

    this.formGroup=this.formBuilder.group({
      
      correo:['',[Validators.required, Validators.minLength(3), Validators.email]],
      password:['',[Validators.required, Validators.minLength(3)]],

    })
  }


  ValidarFormLogin(){
    if(this.formGroup.invalid){
      return
    }
    this.ServiceAuth.Login(this.usuario).subscribe(data=>{console.log(data);
    })
  
  }



}
