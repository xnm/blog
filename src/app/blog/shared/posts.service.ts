import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {environment} from "../../../environments/environment";
import {LogFactory} from "../../shared/log.factory";

@Injectable()
export class PostsService {

  constructor(private http: Http,
              private logFactory: LogFactory) {

  }

  private logger = this.logFactory.getLog(PostsService.name);
  private datasource = environment.datasource;

  public getPostList() {
    let svc = this;
    svc.logger.info('Load Posts from:', svc.datasource.posts);
    return svc.http.get(svc.datasource.posts);
  }
}
