export class UsuarioModel{

    id:number;
    nombre:string;
    apellido:string;
    telefono:number;
    correo:string;
    Password:string;
    creadaEn:Date;
    estado:Array<any>;
    rol : Array<any>;
    foto:string;

    constructor(){
        this.estado =[ 
            {ID:2,Valor:"Activo"},
            {ID:3,Valor:"Inactivo"}];
        
        this.rol=[
            {ID:1,Valor:"Administrador"},
            {ID:2,Valor:"Conductor"},
            {ID:2,Valor:"Recolector"}
        ]
        // this.estado =[ "Activo","Inactivo"];

        this.creadaEn = new Date();
    }


}