import {Component, OnInit} from "@angular/core";
import {PostsService} from "../shared/posts.service";
import {LogFactory} from "../../shared/log.factory";
import {BlogTitleService} from "../shared/blog.title.service";
import {routerTransition} from "../../shared/router.animations";

@Component({
  providers: [
    PostsService,
    BlogTitleService
  ],
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  animations:[routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class PostListComponent implements OnInit {

  constructor(private posts: PostsService,
              private titleService: BlogTitleService,
              private logFactory: LogFactory) {
  }

  private logger = this.logFactory.getLog(PostListComponent.name);
  private postList = [];
  private loading = true;

  ngOnInit() {
    let vm = this;
    vm.logger.info('Setting Post List title!');
    vm.titleService.setTitle();
    vm.loadPostList();
  }

  loadPostList(): void {
    let vm = this;
    vm.posts.getFilteredPostList()
      .subscribe(function (postList) {
        vm.postList = postList;
        vm.loading = false;
        vm.logger.info('Post List status update:', vm.postList.length);
      });
  }

}
