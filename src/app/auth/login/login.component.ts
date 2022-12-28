import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent {

  public formSubmitted: boolean = false;

  public loginForm = this.fb.group({
    email: [ 'tests@gmail.com', [Validators.required, Validators.email]],
    password: [ '123456', Validators.required ],
    remember: [false]
  });

  constructor( private router: Router,
               private fb: FormBuilder,
               private loginService: UsuarioService ) { }

  login(): void {

    this.loginService.loginUsuario( this.loginForm.value ).subscribe(res => {
      console.log(res)
    },err => {
      Swal.fire(
        'Error',
        err.error.msg,
        'error'
      )
    })

    // console.log( this.loginForm.value );


    // this.router.navigateByUrl('/');
  }

}
