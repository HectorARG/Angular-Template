import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { obtenerUsuario } from '../interfaces/cargar-usuarios.interface';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http: HttpClient ) { }


  get token(): string {
    return localStorage.getItem('token') || '' ;
   }

   get header(){
    return {
      headers: {
        'x-token': this.token
      }
     }
   }

   busquedaPorTipo(tipo: string, dato: string){
    return this.http.get<any>(`${base_url}/todo/coleccion/${tipo}/${dato}`, this.header).pipe(
      map((resp: any) => resp.resultados)
      )
   }
}
