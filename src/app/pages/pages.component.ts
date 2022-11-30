import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  linkTheme = document.querySelector('#theme')

  constructor() { }

  ngOnInit(): void {

    const defaultTheme = "./assets/css/colors/default-dark.css"
    const theme = localStorage.getItem('theme')

    if(theme){
      this.linkTheme.setAttribute('href', theme);
    }else if(!theme){
      this.linkTheme.setAttribute('href', defaultTheme);
    }
  }

}
