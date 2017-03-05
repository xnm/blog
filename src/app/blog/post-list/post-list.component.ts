import {Component, OnInit} from "@angular/core";
import {PostsService} from "../shared/posts.service";
import {LogFactory} from "../../shared/log.factory";

@Component({
  providers: [
    PostsService
  ],
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  constructor(private posts: PostsService,
              private logFactory: LogFactory) {
  }

  private logger = this.logFactory.getLog(PostListComponent.name);
  private postList = [];

  ngOnInit() {
    let vm = this;
    vm.loadPostList();
  }

  loadPostList(): void {
    let vm = this;
    vm.posts.getPostList()
      .subscribe(function (postList) {
        vm.postList = postList;
        vm.logger.info('Post List status update:', vm.postList.length);
      });
  }

}
