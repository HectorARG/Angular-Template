import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface.';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { tap } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http: HttpClient ) { }

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
