import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UsuarioModel } from 'src/app/model/Usuario.model';


import { Router } from '@angular/router';
import { EditarComponent } from '../editarUsuario/editar.component';
import { AutenticacionService } from 'src/app/services/autenticacion.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit ,OnDestroy{

  // @ViewChild(EditarComponent) child: EditarComponent;
  public user:UsuarioModel=new UsuarioModel();
  public visible:boolean=false;
  estadoUser:Array<any>;
  rolUser:Array<any>;
  ListaUsuarios:Array<any>=[]
  SearchApe :string;
  SearchId  :string;
  SearchRol :string;
  SearchNom :string;
  SearchEmail :string;
  SearchStatus  :string;
  SearchTel :string;
  SearchN :string
  constructor(private S_Usuario:UsuariosService, 
              private router:Router,
               private S_Auth: AutenticacionService){ 
                this.obtenerUsuarios();
                this.estadoUser=this.user.estado;
                this.rolUser=this.user.rol;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    // pendiente
  }
  
  obtenerUsuarios(){
    
    this.S_Usuario.ObtenerUsuarios().subscribe(data=>{ 
    this.ListaUsuarios=data;
      //  console.table(this.ListaUsuarios)
      })
  }

  eliminarUsuario(user:any){

    this.S_Usuario.eliminarUser(user.IdJSON).subscribe((data:any)=>{
     data==null?window.location.reload():null;
    })
  }

  editarUsuario(user?:UsuarioModel){
    
    this.visible=true;
    user!=null?
    localStorage.setItem('usuario', JSON.stringify(user)):
    localStorage.removeItem('usuario');
   //  return this.router.navigate([`/EditarUser`,user.id]); 
  }


}
