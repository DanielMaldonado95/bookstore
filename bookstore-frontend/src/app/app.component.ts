import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <app-navbar></app-navbar>
  <div class="container-fluid mt-7">
    <router-outlet></router-outlet>
  </div>
  `,
})
export class AppComponent {
}
