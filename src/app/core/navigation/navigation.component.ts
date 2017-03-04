import {Component, style, trigger, transition, animate, OnInit} from "@angular/core";
import {LogFactory} from "../../shared/log.factory";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  animations: [
    trigger('sideNavState', [
      transition('hide => show', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
      ])
    ]),
    trigger('sideNavFaceState', [
      transition('hide => show', [
        style({
          opacity: 0,
        }),
        animate('0.1s 0.2s ease-in')
      ])
    ])
  ]
})
export class NavigationComponent implements OnInit {


  constructor(private logFactory: LogFactory) {
  }

  private logger = this.logFactory.getLog(NavigationComponent.name);

  private hideSideNav: boolean = true;
  private sideNavState: string = 'hide';
  private blog = environment.blog;
  private subLinksOpenStatus = environment.blog.blogLinks.map(() => {
    return false
  });

  ngOnInit(): void {
  }

  toggleSideNavShowStatus(): void {
    let vm = this;
    vm.hideSideNav = !vm.hideSideNav;
    vm.sideNavState = vm.hideSideNav ? 'hide' : 'show';
    vm.logger.info('sideNavState:', vm.sideNavState);
  }

  toggleLinksOpenStatus(index: number): void {
    let vm = this;
    if (index <= vm.subLinksOpenStatus.length - 1) {
      vm.subLinksOpenStatus [index] = !vm.subLinksOpenStatus[index];
    }
  }

  openExternalLink(url: string): void {
    window.open(url, '_blank');
  }

}
