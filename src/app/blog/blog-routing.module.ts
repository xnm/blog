import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {PostListComponent} from "./post-list/post-list.component";
import {PostDetailComponent} from "./post-detail/post-detail.component";
import {CommonModule} from "@angular/common";
import {NotFoundComponent} from "./not-found/not-found.component";
import {TagDetailComponent} from "./tag-detail/tag-detail.component";
import {TagListComponent} from "./tag-list/tag-list.component";
import {CategoryListComponent} from "./category-list/category-list.component";
import {CategoryDetailComponent} from "./category-detail/category-detail.component";


const blogRoutes: Routes = [
  {
    path: '',
    component: PostListComponent
  },
  {
    path: 'posts',
    component: PostListComponent
  },
  {
    path: 'post/:year/:month/:date/:postName',
    component: PostDetailComponent
  },
  {
    path: 'tag/:tagName',
    component: TagDetailComponent
  },
  {
    path: 'tags',
    component: TagListComponent
  },
  {
    path: 'category/:categoryName',
    component: CategoryDetailComponent
  },
  {
    path: 'categories',
    component: CategoryListComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(blogRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class BlogRoutingModule {
}