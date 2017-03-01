/* Created by Aquariuslt on 2017-03-02. */

import {Injectable, OnInit} from "@angular/core";
import {LogFactory} from "../../shared/log.factory";

@Injectable()
export class BlogConfigService implements OnInit{


  constructor(private logFactory:LogFactory) {}

  private logger = this.logFactory.getLog(BlogConfigService.name);

  ngOnInit(): void {
    let vm = this;
    vm.logger.info('blog config service is running');
  }

  loadBlogConfig():void{

  }

  getBlogConfig(){
    let vm = this;
    vm.logger.info('get blog config:');
  }

}