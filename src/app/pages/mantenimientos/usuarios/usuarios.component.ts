import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuarios.model';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;
  public datoBusqueda: string;

  constructor( private usuarioService: UsuarioService,
               private busquedasService: BusquedasService ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.obtenerUsuarios(this.desde).subscribe(({ total, usuarios }) => {
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.cargando = false;
    });
  }

  paginacion(valor: number){
    this.desde += valor

    if( this.desde < 0 ){
      this.desde = 0
    }else if(this.desde > this.totalUsuarios){
      this.desde -= valor
    }

    this.cargarUsuarios();
  }

  buscar(){
    if(this.datoBusqueda.length != 0){
      this.busquedasService.busquedaPorTipo('usuarios', this.datoBusqueda).subscribe(resp => {
        this.usuarios = resp
      })
    }else {
      this.cargarUsuarios();
    }

  }

}
