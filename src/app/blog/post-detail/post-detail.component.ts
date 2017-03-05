import {Component, OnInit} from "@angular/core";
import {Location} from "@angular/common";
import {Params, ActivatedRoute} from "@angular/router";
import {LogFactory} from "../../shared/log.factory";
import {PostsService} from "../shared/posts.service";
import "rxjs/add/operator/switchMap";
import {Post} from "../shared/post.model";
import marked from "marked";

@Component({
  providers: [
    PostsService
  ],
  selector: 'post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  constructor(private logFactory: LogFactory,
              private posts: PostsService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  private logger = this.logFactory.getLog(PostDetailComponent.name);
  private post: Post = new Post();
  private postHtmlContent: string;

  ngOnInit() {
    let vm = this;
    vm.loadPostDetail();
  }

  loadPostDetail() {
    let vm = this;
    vm.route.params.switchMap(function (params: Params) {
      let year = params['year'];
      let month = params['month'];
      let date = params['date'];
      let postName = params['postName'];
      let link = year + '/' + month + '/' + date + '/' + postName;
      vm.logger.info('Post Link:', link);
      return vm.posts.getPost(link);
    }).subscribe(function (post) {
      vm.post = new Post(post);
      vm.logger.info('Load Post:', vm.post.title);
      vm.renderPostContent();
    });
  }

  renderPostContent() {
    let vm = this;
    let tokens = vm.post.tokens;
    tokens.links = {};
    vm.postHtmlContent = marked.parser(tokens);
  }

}
