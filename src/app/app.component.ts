/* Created by Aquariuslt on 1-1-2017.*/
import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-root',
  template: `
    <!-- header area -->
    <navigation></navigation>
    <!-- ui view -->
    <router-outlet></router-outlet>
  `
})
export class AppComponent {

  constructor() {
  }

}
