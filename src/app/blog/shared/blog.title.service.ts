/* Created by Aquariuslt on 2017-03-12. */
import {Injectable} from "@angular/core";
import {Title} from "@angular/platform-browser";
import {Router, NavigationEnd} from "@angular/router";
import {LogFactory} from "../../shared/log.factory";
import {environment} from "../../../environments/environment";
@Injectable()
export class BlogTitleService {

  constructor(private titleService: Title,
              private router: Router,
              private logFactory: LogFactory) {
    let svc = this;
    svc.subscribeNavigationEndEvent();
  }


  private logger = this.logFactory.getLog(BlogTitleService.name);

  private baseTitle = environment.blog.siteName;

  private subscribeNavigationEndEvent() {
    let svc = this;
    svc.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
      }
    });
  }

  public setTitle(newTitle?: String) {
    let svc = this;
    if(!newTitle){
      svc.titleService.setTitle(svc.baseTitle);
    }
    else{
      let combinedTitle = newTitle + ' | ' + svc.baseTitle;
      svc.titleService.setTitle(combinedTitle);
    }
  }

}