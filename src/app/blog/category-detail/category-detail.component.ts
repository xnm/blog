import {Component, OnInit} from "@angular/core";
import {PostsService} from "../shared/posts.service";
import {ActivatedRoute, Params} from "@angular/router";
import {LogFactory} from "../../shared/log.factory";

@Component({
  providers: [
    PostsService
  ],
  selector: 'category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {

  constructor(private logFactory: LogFactory,
              private posts: PostsService,
              private route: ActivatedRoute) {
  }

  private logger = this.logFactory.getLog(CategoryDetailComponent.name);
  private categoryName = '';
  private postList = [];

  ngOnInit() {
    let vm = this;
    vm.queryPostList();
  }

  queryPostList(){
    let vm = this;
    vm.route.params.switchMap(function (params: Params) {
      let categoryName = params['categoryName'];
      vm.logger.info('Load Post by Category:',categoryName);
      vm.categoryName = categoryName;
      return vm.posts.queryByCategoryName(categoryName);
    }).subscribe(function (postList) {
      vm.postList = postList;
      vm.logger.info('Query Posts:', vm.postList.length);
    });
  }
}
