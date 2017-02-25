import {Component} from "@angular/core";

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  constructor() {
  }

  private searchInputOpened: boolean = false;

  toggleSearchInput(): void {
    let vm = this;
    vm.searchInputOpened = !vm.searchInputOpened;
  }


}
