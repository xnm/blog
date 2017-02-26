import {Component} from "@angular/core";

@Component({
  selector: 'nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent {

  constructor() {
  }

  searchInputOpened:boolean = false;
  sideNavbarOpened:boolean = false;


  toggleSearchInput():void{
    let vm = this;
    vm.searchInputOpened = !vm.searchInputOpened;
  }

  toggleNavSidebar():void{
    let vm = this;
    vm.sideNavbarOpened = !vm.sideNavbarOpened;
  }

}
