import {Injectable} from "@angular/core";
import {BlogConfig} from "./blog-config.model";

@Injectable()
export class BlogConfigService {

  private _blogConfig: BlogConfig = new BlogConfig();

  constructor() {
  }


  getBlogConfigs(): BlogConfig {
    return this._blogConfig;
  }
}
