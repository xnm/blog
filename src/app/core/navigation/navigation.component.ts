import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  constructor() { }

  private searchInputOpened:boolean = false;
  private searchCriteria:string = '';

  toggleSearchInput():void{
    let vm = this;
    vm.searchInputOpened = !vm.searchInputOpened;
  }
}
