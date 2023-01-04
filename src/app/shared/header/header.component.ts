import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../models/usuarios.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor( private user: UsuarioService) {
    this.usuario = user.usuario;
   }

  ngOnInit(): void {
  }

  logout(){
    this.user.logout();
  }

}
