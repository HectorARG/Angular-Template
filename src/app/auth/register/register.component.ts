import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  public formSubmitted: boolean = false;

  public registerForm = this.fb.group({
    nombre: [ null, [ Validators.required, Validators.minLength(3) ], ],
    email: [ null, [ Validators.required ], ],
    password: [ null, [ Validators.required ], ],
    password2: [ null, [ Validators.required ], ],
    terminos: [false, [ Validators.required ], ],
  },{
    validators: this.passwordsIguales('password', 'password2')
  });

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService
     ) { }

  crearUsuario(){
    this.formSubmitted = true;

    if( this.registerForm.invalid ){
     return;
    }

    this.usuarioService.crearUsuario(this.registerForm.value).subscribe(resp => {
      console.log('crearUsuario')
      console.log(resp)
    }, err => {
      Swal.fire(
        'Error',
        err.error.msg,
        'error'
      )
    } )
  }

  camponoValido( campo: string ): boolean {

    if( this.registerForm.get(campo).invalid && this.formSubmitted ){
      return true
    }else{
      return false
    }

  }

  contrasenasNoValidas(){
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if( (pass1 !== pass2) && this.formSubmitted  ){
      return true
    }else{
      return false
    }
  }

  aceptaTerminos(): boolean {
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  passwordsIguales(pass1: string, pass2: string){

    return ( formGroup: FormGroup )=> {

      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if( pass1Control.value === pass2Control.value ){
        pass2Control.setErrors(null);
      }else{
        pass2Control.setErrors({ noEsIgual: true });
      }

    }

  }


}
