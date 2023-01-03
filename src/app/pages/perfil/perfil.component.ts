import { Usuario } from './../../models/usuarios.model';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  usuario: Usuario;

  public perfilForm: FormGroup;

  constructor( private fb: FormBuilder,
               private user: UsuarioService ) {
    this.usuario = user.usuario;
              }

              ngOnInit(): void {
    this.usuario = this.user.usuario;
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email , [Validators.required, Validators.email]],
    });
  }

  actualizarPerfil(){
    console.log(this.perfilForm.value)
    this.user.actualizarUsuario(this.perfilForm.value).subscribe(() => {
      const { nombre, email } = this.perfilForm.value;
      this.usuario.nombre = nombre;
      this.usuario.email = email;
    })

  }
}
