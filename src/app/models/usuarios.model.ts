import { environment } from 'src/environments/environment';

const api_url = environment.base_url;

export class Usuario {

  constructor(
      public nombre: string,
      public email: string,
      public password: string,
      public google?: boolean,
      public img?: string,
      public role?: string,
      public uid?: string,
    ){}

    get imagenUrl() {

      // if( !this.img ){

      //   return `${api_url}/upload/usuarios/no-image`

      // }else
      if( this.img != undefined &&this.img.includes('https') ){
console.log('', this.img);

        return this.img;


      } else if( this.img ){

        return `${api_url}/upload/usuarios/${ this.img }`

      }
      else{
        return `${api_url}/upload/usuarios/no-image`

      }
    }
}
