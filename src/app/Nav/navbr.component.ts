import { Component } from '@angular/core';
@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styles: [
    `
      .nav.navbar-nav {
        font-siz: 15px;
      }
      #searchForm {
        marging-right: 100px;
      }
    `,
  ],
})
export class NavBar {}
