import { Usuario } from './../../models/usuarios.model';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public usuario: Usuario;
  public perfilForm: FormGroup;
  public imagenSubir: File;

  constructor( private fb: FormBuilder,
               private user: UsuarioService,
               private fileUploadService: FileUploadService ) {
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

      Swal.fire('Guardado', 'Cambios guardados en la BD', 'success');
    }, err => {
      Swal.fire('Error', err.error.msg, 'error');
    })

  }

  cambiarImagen( file: File ){
    this.imagenSubir = file;
    console.log(this.imagenSubir)
  }

  subirImagen(){
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
                .then( resp => {
                  this.usuario.img = resp;
                  Swal.fire('Guardado', 'Foto de perfil actualizada', 'success');
                }, err => {
                  Swal.fire('Error', err.error.msg, 'error');
                })
  }
}
