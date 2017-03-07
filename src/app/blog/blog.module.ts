import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "@angular/material";
import {DisqusModule} from "ng2-awesome-disqus";
import {PostListComponent} from "./post-list/post-list.component";
import {PostCardComponent} from "./post-card/post-card.component";
import {BlogRoutingModule} from "./blog-routing.module";
import {CovalentLayoutModule, CovalentCoreModule} from "@covalent/core";
import {PostDetailComponent} from "./post-detail/post-detail.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {TagDetailComponent} from "./tag-detail/tag-detail.component";

@NgModule({
  imports: [
    CommonModule,
    BlogRoutingModule,
    MaterialModule,
    CovalentCoreModule,
    CovalentLayoutModule,
    DisqusModule
  ],
  declarations: [
    PostListComponent,
    PostCardComponent,
    PostDetailComponent,
    NotFoundComponent,
    TagDetailComponent
  ],
  exports: [],
  providers: []
})
export class BlogModule {

}
