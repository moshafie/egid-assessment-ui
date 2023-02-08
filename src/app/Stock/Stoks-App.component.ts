import { Component } from '@angular/core';

@Component({
  selector: 'stocks-app',
  template: `
  <router-outlet></router-outlet> `,
})
export class StokeAppComponent {
  title = 'EGID Stoks';
}
