import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service'
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuarios.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItem: any[]
  usuario: Usuario;

  constructor( private sidebarService: SidebarService, private user: UsuarioService ) {
    this.menuItem = sidebarService.menu;
    this.usuario = user.usuario;
   }

  ngOnInit(): void {
  }

}
