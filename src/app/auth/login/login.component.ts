import { AfterViewInit, Component, ElementRef, ViewChildren } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements AfterViewInit {

  @ViewChildren('googleBtn', {read: ElementRef}) googleBtn: any;

  public formSubmitted: boolean = false;

  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: [ null, Validators.required ],
    remember: [false]
  });

  constructor( private router: Router,
               private fb: FormBuilder,
               private loginService: UsuarioService ) { }


  ngAfterViewInit(): void {
    this.google();
    console.log(this.googleBtn.nativeElement)
  }

  google(){
    google.accounts.id.initialize({
      client_id: "631356370326-io8u04kq6elvjessnr0fsrr6q5b2cg6r.apps.googleusercontent.com",
      callback: this.handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      // this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response: any){
    console.log("Encoded JWT ID token: " + response.credential);
  }

  login(): void {

    this.loginService.loginUsuario( this.loginForm.value ).subscribe(res => {
      if (this.loginForm.get('remember').value) {
        localStorage.setItem('email', this.loginForm.get('email').value);
        // localStorage.setItem('password', this.loginForm.get('password').value);
      }else {
        localStorage.removeItem('email');
        // localStorage.removeItem('password');
      }

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
