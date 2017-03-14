import {Component, OnInit, animate, transition, style, state, trigger} from "@angular/core";
import {LogFactory} from "../../shared/log.factory";
import {PostsService} from "../shared/posts.service";

@Component({
  providers: [
    PostsService
  ],
  selector: 'category-menu-list',
  templateUrl: './category-menu-list.component.html',
  styleUrls: ['./category-menu-list.component.css'],
  animations:[
    trigger('subLinkOpenState', [
      state('opened', style({
        transform: 'rotate(0deg)'
      })),
      state('closed', style({
        transform: 'rotate(180deg)'
      })),
      transition('closed => opened', [
        animate('1s ease-out')
      ]),
      transition('opened => closed', [
        animate('1s ease-out')
      ])
    ]),
    trigger('subLinkExpandState', [
      state('opened', style({
        height: '*'
      })),
      state('closed', style({
        height: 0,
        opacity: 0,
      })),
      transition('closed => opened', [
        animate('1s ease-out', style({
          height: '*',
          opacity: 100
        }))
      ]),
      transition('opened => closed', [
        animate('1s ease-out', style({
          height: 0,
          opacity: 0
        }))
      ])
    ])
  ]
})
export class CategoryMenuListComponent implements OnInit {

  constructor(private posts: PostsService,
              private logFactory: LogFactory) {
  }

  private logger = this.logFactory.getLog(CategoryMenuListComponent.name);
  private categoryList = [];
  private categoryMenuOpenStatus = false;
  private subLinkOpenState = 'closed';

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
    vm.subLinkOpenState = vm.categoryMenuOpenStatus?'opened':'closed';
  }
}
