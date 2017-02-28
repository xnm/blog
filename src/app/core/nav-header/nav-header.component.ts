import {Component, trigger, transition, style, animate} from "@angular/core";
import {LogFactory} from "../../shared/log.factory";

@Component({
  selector: 'nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css'],
  animations: [
    trigger('sidenavState', [
      transition('show => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition('* => show', [
        style({
          opacity: 0,
          transform: 'translateX(100%)'
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
  sideNavbarShowStatus: string = 'show';

  toggleSearchInput(): void {
    let vm = this;
    vm.searchInputOpened = !vm.searchInputOpened;
    }

  toggleNavSidebar(): void {
    let vm = this;
    vm.sideNavbarOpened = !vm.sideNavbarOpened;
    vm.sideNavbarShowStatus = vm.sideNavbarShowStatus == 'show' ? 'hide' : 'show';
    vm.logger.info('navbar show status:',vm.sideNavbarShowStatus);
  }

}
