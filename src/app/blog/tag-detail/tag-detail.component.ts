import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {PostsService} from "../shared/posts.service";
import {LogFactory} from "../../shared/log.factory";
import {BlogTitleService} from "../shared/blog.title.service";
import {routerTransition} from "../../shared/router.animations";

@Component({
  providers: [
    PostsService,
    BlogTitleService
  ],
  selector: 'tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.css'],
  animations:[routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class TagDetailComponent implements OnInit {

  constructor(private logFactory: LogFactory,
              private titleService: BlogTitleService,
              private posts: PostsService,
              private route: ActivatedRoute) {
  }

  private logger = this.logFactory.getLog(TagDetailComponent.name);
  private tagName = '';
  private postList = [];


  ngOnInit() {
    let vm = this;
    vm.queryPostList();
  }

  queryPostList(){
    let vm = this;
    vm.route.params.switchMap(function (params: Params) {
      let tagName = params['tagName'];
      vm.logger.info('Load Post by Tag:',tagName);
      vm.tagName = tagName;
      vm.titleService.setTitle('Tag:'+tagName);
      return vm.posts.queryByTagName(tagName);
    }).subscribe(function (postList) {
      vm.postList = postList;
      vm.logger.info('Query Posts:', vm.postList.length);
    });
  }

}
