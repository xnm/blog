import {Component, style, trigger, transition, animate, OnInit} from "@angular/core";
import {LogFactory} from "../../shared/log.factory";
import {BlogConfigService} from "../../blog/shared/blog-config.service";
import {BlogConfig} from "../../blog/shared/blog-config.model";

@Component({
  selector: 'navigation',
  providers: [
    BlogConfigService
  ],
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


  constructor(private logFactory: LogFactory,
              private blogConfigService: BlogConfigService) {
  }

  private logger = this.logFactory.getLog(NavigationComponent.name);

  private hideSideNav: boolean = true;
  private sideNavState: string = 'hide';
  private blogConfig: BlogConfig;
  private linkOpenStatus = [false, false];

  ngOnInit(): void {
    let vm = this;
    vm.blogConfig = vm.blogConfigService.getBlogConfigs();
  }

  toggleSideNavShowStatus(): void {
    let vm = this;
    vm.hideSideNav = !vm.hideSideNav;
    vm.sideNavState = vm.hideSideNav ? 'hide' : 'show';
    vm.logger.info('sideNavState:', vm.sideNavState);
  }

  toggleLinksOpenStatus(index: number): void {
    let vm = this;
    if (index <= vm.linkOpenStatus.length - 1) {
      vm.linkOpenStatus [index] = !vm.linkOpenStatus[index];
    }
  }

  openExternalLink(url: string): void {
    window.open(url,'_blank');
  }

}
