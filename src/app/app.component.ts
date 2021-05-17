import { Component } from '@angular/core';

@Component({
  selector: 'pm-root',
  // templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
  template: /*`
   <div>  
  <h1>
    MM - Welcome to {{pageTitle}}!!
  </h1>
  <pm-products></pm-products>
  </div>
  `*/
  `
    <nav class='navbar navbar-expand navbar-light bg-light'>
        <a class='navbar-brand'>{{pageTitle}}</a>
        <ul class='nav nav-pills'>
          <li><a class='nav-link' routerLinkActive='active' button='/welcome'>Home</a></li>
          <li><a class='nav-link' routerLinkActive='active' routerLink='/products'>Product List</a></li>
        </ul>
    </nav>
    <div class='container'>
      <pm-products></pm-products>
    </div>
    `,
})
export class AppComponent {
  pageTitle = 'SLB Test - Manuel Marín';
}
