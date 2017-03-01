import {Component, trigger, transition, style, animate} from "@angular/core";
import {LogFactory} from "../../shared/log.factory";

@Component({
  selector: 'nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css'],
  animations: [
    trigger('sidenavState', [
      transition('* => show', [
        style({
          transform: 'none'
        }),
        animate('0.2s ease-in')
      ])
    ])
  ]
})
export class NavHeaderComponent {

  constructor(private logFactory:LogFactory) {
  }
  
  private logger = this.logFactory.getLog(NavHeaderComponent.name);
  
  searchInputOpened: boolean = false;
  sideNavbarOpened: boolean = false;
  sideNavbarShowStatus: string = 'hide';

  toggleSearchInput(): void {
    let vm = this;
    vm.searchInputOpened = !vm.searchInputOpened;
    }

  toggleNavSidebar(): void {
    let vm = this;
    vm.sideNavbarOpened = !vm.sideNavbarOpened;
    vm.sideNavbarShowStatus = vm.sideNavbarOpened?'show':'hide';
  }

}