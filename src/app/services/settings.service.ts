import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme: Element = document.querySelector('#theme')

  constructor() {
    const theme = localStorage.getItem('theme') || "./assets/css/colors/default-dark.css";
    this.linkTheme.setAttribute('href', theme);
   }

   changeTheme(argumento: string): void {
    const url = `./assets/css/colors/${argumento}.css`
    this.linkTheme.setAttribute('href', url);
    localStorage.setItem('theme', url);

    this.checkCurrenttheme();
  }

  checkCurrenttheme(): void {
    const links = document.querySelectorAll('.selector');
    links.forEach(elm => {
      elm.classList.remove('working');
      const btnTheme = elm.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${ btnTheme }.css`;
      const currentTheme = this.linkTheme.getAttribute('href');

      if(btnThemeUrl === currentTheme){
        elm.classList.add('working');
      }
    })
  }

}
