import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {PostListComponent} from "./post-list/post-list.component";


const blogRoutes: Routes = [
  {
    path: '',
    component: PostListComponent
  },
  {
    path: 'posts',
    component: PostListComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(blogRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class BlogRoutingModule {
}