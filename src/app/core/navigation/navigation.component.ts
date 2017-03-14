import {Component, style, trigger, transition, animate, OnInit, state} from "@angular/core";
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
    ]),
    trigger('subLinkOpenState', [
      state('opened', style({
        transform: 'rotate(0deg)'
      })),
      state('closed', style({
        transform: 'rotate(180deg)'
      })),
      transition('closed => opened', [
        animate('0.5s ease-out')
      ]),
      transition('opened => closed', [
        animate('0.5s ease-out')
      ])
    ]),
    trigger('subLinkExpandState', [
      state('opened', style({
        height: '*'
      })),
      state('closed', style({
        height: 0,
        opacity: 0,
      })),
      transition('closed => opened', [
        animate('0.5s ease-out', style({
          height: '*',
          opacity: 100
        }))
      ]),
      transition('opened => closed', [
        animate('0.5s ease-out', style({
          height: 0,
          opacity: 0
        }))
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
  private subLinksOpenStates = environment.blog.blogLinks.map(() => {
    return 'closed';
  });

  ngOnInit(): void {
  }

  toggleSideNavShowStatus(): void {
    let vm = this;
    vm.hideSideNav = !vm.hideSideNav;
    vm.sideNavState = vm.hideSideNav ? 'hide' : 'show';
    vm.logger.info('SideNavState:', vm.sideNavState);
  }

  toggleLinksOpenStatus(index: number): void {
    let vm = this;
    if (index <= vm.subLinksOpenStatus.length - 1) {
      vm.subLinksOpenStatus [index] = !vm.subLinksOpenStatus[index];
      vm.subLinksOpenStates [index] = vm.subLinksOpenStatus [index] ? 'opened' : 'closed';
    }
  }

  openExternalLink(url: string): void {
    window.open(url, '_blank');
  }

}
