import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface.';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  constructor( private http: HttpClient, private router: Router, private ngZone: NgZone ) {
    this.googleInit();
   }

  googleInit(){

    return new Promise<void>( resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '631356370326-io8u04kq6elvjessnr0fsrr6q5b2cg6r.apps.googleusercontent.com"',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    })
  }

  logout(){
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });
  }

  validarToken(): Observable<boolean>{
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/login/renew`, {headers: {'x-token': token}})
      .pipe(tap((res: any) => {
        localStorage.setItem('token', res.token);
      }),map(respuesta => true, err => false),catchError(error => of(false)));
  }

  crearUsuario( formData: RegisterForm ) {

    return this.http.post(`${base_url}/usuarios`, formData).pipe(tap((resp: any) => {
      localStorage.setItem('token', resp.token);
}));

  }

  loginUsuario( formData: LoginForm ) {

    return this.http.post(`${base_url}/login`, formData).pipe(tap((resp: any) => {
              localStorage.setItem('token', resp.token);
    }));

  }

  loginGoogle( token: string ) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(tap((resp: any) => {
      localStorage.setItem('token', resp.token);
    }));
  }



}
