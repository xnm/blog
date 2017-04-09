import {Injectable} from "@angular/core";
import {LogFactory} from "../../shared/log.factory";
import {NavigationMenu} from "./navigation-menu.model";
import {Subject} from "rxjs";
import {Author} from "./author.model";

@Injectable()
export class NavigationMenuService {

  private logger = this.logFactory.getLog(NavigationMenuService.name);

  private menus = [];
  private menus$: Subject<NavigationMenu> = new Subject<NavigationMenu>();

  private author = new Author();
  private author$: Subject<Author> = new Subject<Author>();

  private title = '';
  private title$: Subject<string> = new Subject();

  constructor(private logFactory: LogFactory) {
    const svc = this;
    svc.logger.info('Navigation Menu Service is running.');
  }

  public getMenus() {
    const svc = this;
    return svc.menus$;
  }

  public getAuthor() {
    const svc = this;
    return svc.author$;
  }

  public getTitle() {
    const svc = this;
    return svc.title$;
  }

  public addNavigationMenu(menu): void {
    const svc = this;
    const navigationMenu = new NavigationMenu(menu);
    svc.menus.push(navigationMenu);
    svc.menus$.next(navigationMenu);
  }

  public applyAuthorInfo(author: Author) {
    const svc = this;
    svc.author = author;
    svc.author$.next(author);
  }

  public applyApplicationTitle(applicationTitle: string) {
    const svc = this;
    svc.title = applicationTitle;
    svc.title$.next(applicationTitle);
  }

}
