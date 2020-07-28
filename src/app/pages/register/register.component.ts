import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioModel } from 'src/app/model/Usuario.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { ValidationService } from 'src/app/services/validadores/ValidationForm.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegistryComponent implements OnInit  {

  
  usuario:UsuarioModel =new UsuarioModel();
  formGroup:FormGroup;
  email:boolean;
  constructor( private formBuilder:FormBuilder,
               private ServicioAut: AutenticacionService,
               private ServicioValida:ValidationService,
               private router:Router) {
                this.ValidarFormulario();
              this.email=false;
              }

  ngOnInit() {
    this.usuario.correo= "";
    this.usuario.Password="123";
    this.usuario.nombre="Jorge Alejandro Morcillo";
   
  }

   get ValidarNombre(){
    
    return  this.formGroup.get('nombre').invalid &&  this.formGroup.get('nombre').touched
   }

   get ValidarCorreo(){

    const Controlcorreo=this.formGroup.get('correo');
    return  Controlcorreo.invalid &&  Controlcorreo.touched  
   }

   get ValidarPassword(){

    return  this.formGroup.get('password').invalid &&  this.formGroup.get('password').touched 
   }

   get ConfirmacionPassword(){
  
    return  (this.formGroup.get('password').value != this.formGroup.get('confirmpassword').value?  true: false) && this.formGroup.get('confirmpassword').touched ;
   }

  ValidarFormulario(){

  this.formGroup=this.formBuilder.group(
    {
    nombre:['',[Validators.required, Validators.minLength(3)]],
    correo:['',[Validators.required, Validators.minLength(3), Validators.email]],
    password:['',[Validators.required, Validators.minLength(3)]],
    confirmpassword:['',[Validators.required]],
    },
    {
      validators:
      [
        this.ServicioValida.EmailIguales
      ]
    }
  )}

  GuardarFormulario(){
    
    if(this.formGroup.invalid){
    return;
  }
    this.ServicioAut.crearUsuario(this.usuario).subscribe();
    // console.log(this.formGroup);
}

  ValidarEmailActual(){ 

    const Controlcorreo=this.formGroup.get('correo').value;
    const prueba=this.ServicioValida.ValidarsiExisteCorreo(Controlcorreo).subscribe(data=>{
                      this.email=data});
    return prueba;
}




 
}