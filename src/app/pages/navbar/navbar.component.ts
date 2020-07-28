import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public S_Auth:AutenticacionService) {
    console.log(this.S_Auth.usuario);
  
    
    
   }

  ngOnInit(): void {
   
  }

}