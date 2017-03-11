import {Component, OnInit} from "@angular/core";
import {LogFactory} from "../../shared/log.factory";
import {PostsService} from "../shared/posts.service";

@Component({
  providers: [
    PostsService
  ],
  selector: 'category-menu-list',
  templateUrl: './category-menu-list.component.html',
  styleUrls: ['./category-menu-list.component.css']
})
export class CategoryMenuListComponent implements OnInit {

  constructor(private posts: PostsService,
              private logFactory: LogFactory) {
  }

  private logger = this.logFactory.getLog(CategoryMenuListComponent.name);
  private categoryList = [];
  private categoryMenuOpenStatus = false;

  ngOnInit() {
    let vm = this;
    vm.loadCategoryList();
  }

  loadCategoryList(): void {
    let vm = this;
    vm.posts.getCategoryList()
      .subscribe(function (categoryList) {
        vm.categoryList = categoryList;
      });
  }


  toggleCategoryMenuOpenStatus(): void {
    let vm = this;
    vm.categoryMenuOpenStatus = !vm.categoryMenuOpenStatus;
  }
}
