import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  linkTheme: Element = document.querySelector('#theme')
  links: NodeListOf<Element>;

  constructor() { }

  ngOnInit(): void {
    this. links = document.querySelectorAll('.selector');
    this.checkCurrenttheme();
  }

  changeTheme(argumento: string): void {
    const url = `./assets/css/colors/${argumento}.css`

    this.linkTheme.setAttribute('href', url);

    localStorage.setItem('theme', url);
    this.checkCurrenttheme();
  }

  checkCurrenttheme(): void {

    this.links.forEach(elm => {

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
