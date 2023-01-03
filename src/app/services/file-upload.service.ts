import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url,

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string
  ){

    try {

      const url = `${ base_url }/upload/${ tipo }/${ id }`

    } catch (error) {
      console.log(error);

      return false;
    }
  }



}
