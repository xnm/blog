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
import {AboutComponent} from "./about/about.component";


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
    component: TagDetailComponent,
    data: {
      title: 'Tag'
    }
  },
  {
    path: 'tags',
    component: TagListComponent,
    data: {
      title: 'Tags'
    }
  },
  {
    path: 'category/:categoryName',
    component: CategoryDetailComponent,
    data: {
      title: 'Category'
    }
  },
  {
    path: 'categories',
    component: CategoryListComponent,
    data: {
      title: 'Categories'
    }
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: {
      title: 'Oops... Not Found'
    }
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