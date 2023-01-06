import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface.';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuarios.model';
import { obtenerUsuario } from '../interfaces/cargar-usuarios.interface';

const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor( private http: HttpClient, private router: Router, private ngZone: NgZone ) {
    // this.googleInit();
   }

   get token(): string {
    return localStorage.getItem('token') || '';
   }

   get uid(): string {
    return this.usuario.uid || '';
   }

   get header(){
    return {
      headers: {
        'x-token': this.token
      }
     }
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
    // this.auth2.signOut().then(() => {
      // this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      // })
    // });
  }

  validarToken(): Observable<boolean>{



    return this.http.get(`${base_url}/login/renew`, {headers: {'x-token': this.token}})
      .pipe(
        map((res: any) => {
        const { nombre, email, google, img='', role, uid } = res.usuario; //Destructurar el resultado en sus propieaddes
        this.usuario = new Usuario( nombre, email, '', google, img, role, uid );
        localStorage.setItem('token', res.token);
        return true;
      }),
      catchError(error => of(false)));
  }

  crearUsuario( formData: RegisterForm ) {
    return this.http.post(`${base_url}/usuarios`, formData).pipe(tap((resp: any) => {
      localStorage.setItem('token', resp.token);
    }));
}

actualizarUsuario(data: { nombre:string, email: string, role: string}){

  data = {
    ...data,
    role: this.usuario.role
  }

  return this.http.put(`${base_url}/usuarios/${ this.uid }`, data, {headers: {'x-token': this.token}})

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

  obtenerUsuarios(desde: number = 0){

    return this.http.get<obtenerUsuario>(`${base_url}/usuarios?desde=${desde}`, this.header).pipe(
      // delay(1500),
      map(resp => {
        const usuarios = resp.usuarios.map( user => new Usuario(user.nombre, user.email, '', user.google, user.img, user.role, user.uid) )
        return {
          total: resp.total,
          usuarios
        };
      })
    )

  }

}
