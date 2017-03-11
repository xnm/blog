import {Component, OnInit} from "@angular/core";
import {PostsService} from "../shared/posts.service";
import {LogFactory} from "../../shared/log.factory";

@Component({
  providers: [
    PostsService
  ],
  selector: 'tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css']
})
export class TagListComponent implements OnInit {

  constructor(private logFactory: LogFactory,
              private posts: PostsService) {
  }

  private logger = this.logFactory.getLog(TagListComponent.name);
  private tagList = [];
  private selectedTag = '';
  private selectedPostList = [];

  ngOnInit() {
    let vm = this;
    vm.queryPostList();
  }

  queryPostList() {
    let vm = this;
    vm.posts.getTagList()
      .subscribe(function (tagList) {
        vm.tagList = tagList;
        if (tagList.length >= 1) {
          vm.selectTag(tagList[0].tag);
        }
      });
  }

  selectTag(tagName) {
    let vm = this;
    vm.logger.info('Selected Tag:', tagName);
    vm.selectedTag = tagName;
    vm.posts.queryByTagName(tagName)
      .subscribe(function (postList) {
        vm.selectedPostList = postList;
      });
  }

}
