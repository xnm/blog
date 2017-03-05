import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {environment} from "../../../environments/environment";
import {LogFactory} from "../../shared/log.factory";
import * as _ from "lodash";

@Injectable()
export class PostsService {

  constructor(private http: Http,
              private logFactory: LogFactory) {
    let svc = this;
    svc.preLoadToCache();
  }

  private logger = this.logFactory.getLog(PostsService.name);
  private datasource = environment.datasource;

  private preLoadToCache() {
    let svc = this;
    svc.http.get(svc.datasource.posts).share();
  }

  public getPostList() {
    let svc = this;
    svc.logger.info('Load Posts from:', svc.datasource.posts);
    return svc.http.get(svc.datasource.posts)
      .map(function (response) {
        return response.json();
      });
  }

  public getPost(postLink: string) {
    let svc = this;
    return svc.http.get(svc.datasource.posts)
      .map(function (response) {
        let postList = response.json();
        return _.find(postList, {
          link: postLink
        });
      });

  }
}
