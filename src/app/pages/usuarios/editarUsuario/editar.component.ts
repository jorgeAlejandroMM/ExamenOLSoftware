import { Component, OnInit, inject, HostListener ,Input, Output, EventEmitter  } from '@angular/core';

import {  UsuarioModel } from 'src/app/model/Usuario.model';
import { parseJSON } from 'jquery';
import { FormGroup ,  FormBuilder, Validators} from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  public user:UsuarioModel=new UsuarioModel();
  @Output() hide: EventEmitter<void> = new EventEmitter();
  formGroup:FormGroup;
  estadoUser:Array<any>;
  rolUser:Array<any>;
 
  constructor(private fb:FormBuilder, 
              private S_Usuario:UsuariosService,
              private router:Router){
                this.estadoUser=this.user.estado;
                this.rolUser=this.user.rol;
    
   }

  ngOnInit(): void {
    this.ValidarFormulario()
    this.cargarDatosFormulario();
  }

  
  // este metodo cierra lel el modal y el usuario del localStorage
  hideModal() {

    this.ObtenerDataUserStorage()? this.BorrarDataUserStorage():null;
    this.hide.emit();
  }


  cargarDatosFormulario(){

    if(this.ObtenerDataUserStorage()){
      let  temp=this.ObtenerDataUserStorage();
      this.user={...temp};
    }else{
        null;
    }
  }

  get ValidarId(){
    
    return  this.formGroup.get('id').invalid &&  this.formGroup.get('id').touched
   }

  get ValidarNombre(){
    
    return  this.formGroup.get('nombre').invalid &&  this.formGroup.get('nombre').touched
   }

   get ValidarApellido(){
    
    return  this.formGroup.get('apellido').invalid &&  this.formGroup.get('apellido').touched
   }

   get ValidarTelefono(){
    
    return  this.formGroup.get('telefono').invalid &&  this.formGroup.get('telefono').touched
   }

   get ValidarCorreo(){

    const Controlcorreo=this.formGroup.get('correo');
    return  Controlcorreo.invalid &&  Controlcorreo.touched  
   }

   get ValidarPassword(){

    return  this.formGroup.get('password').invalid &&  this.formGroup.get('password').touched 
   }

   get ValidarEstado(){

    return  this.formGroup.get('estado').invalid &&  this.formGroup.get('estado').touched 
   }

   get ValidarRol(){

    return  this.formGroup.get('rol').invalid &&  this.formGroup.get('rol').touched 
   }
  ValidarFormulario(){

    this.formGroup=this.fb.group({
      id:['',[Validators.required ]],
      nombre:['',[Validators.required, Validators.minLength(3)]],
      apellido:['',[Validators.required, Validators.minLength(3)]],
      telefono:['',[Validators.required, Validators.minLength(5)]],
      correo:['',[Validators.required, Validators.minLength(5), Validators.email]],
      password:['',[Validators.required, Validators.minLength(3)]],
      // imagen:['',[Validators.required ]],
      estado:['',[Validators.required]],
      rol:['',[Validators.required]]


    })
  }

  EnviarFormulario(){

    if(this.formGroup.invalid){
      return;
    }else {
      // let tempUser=...this.user
      if(localStorage.getItem('usuario')){ 
      
        this.S_Usuario.ActualizarInformacionUser(this.user).subscribe((data:UsuarioModel)=>{
          if(data.nombre){
            console.log(data);
            this.hideModal();
            window.location.reload();
          }
        })
      
       }else if(localStorage.getItem('usuario')==undefined){

        this.S_Usuario.crearUser(this.user).subscribe((data:UsuarioModel)=>{
          console.log(data);
            this.hideModal();
            window.location.reload();
              
           })
        }
      }
    }

  


  capturarimagen(e){

      const  preview:any = document.querySelector('img');
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload =  ()=> {
        this.user.foto=reader.result as string;
        preview.src = reader.result;
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };

  }

  ObtenerDataUserStorage(){

    let Usuario=parseJSON(localStorage.getItem('usuario'));
    return Usuario;

  }

  BorrarDataUserStorage(){

   return localStorage.removeItem('usuario')
  }
  


}