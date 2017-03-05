import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PostListComponent} from "./post-list/post-list.component";
import {PostCardComponent} from "./post-card/post-card.component";
import {BlogRoutingModule} from "./blog-routing.module";
import {MaterialModule} from "@angular/material";
import {CovalentLayoutModule, CovalentCoreModule} from "@covalent/core";
import {PostDetailComponent} from "./post-detail/post-detail.component";
import {NotFoundComponent} from "./not-found/not-found.component";

@NgModule({
  imports: [
    CommonModule,
    BlogRoutingModule,
    MaterialModule,
    CovalentCoreModule,
    CovalentLayoutModule
  ],
  declarations: [
    PostListComponent,
    PostCardComponent,
    PostDetailComponent,
    NotFoundComponent
  ],
  exports: [],
  providers: []
})
export class BlogModule {

}
