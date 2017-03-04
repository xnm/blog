import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PostListComponent} from "./post-list/post-list.component";
import {PostCardComponent} from "./post-card/post-card.component";
import {BlogRoutingModule} from "./blog-routing.module";
import {MaterialModule} from "@angular/material";
import {CovalentLayoutModule, CovalentCoreModule} from "@covalent/core";

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
    PostCardComponent
  ],
  exports: [],
  providers: []
})
export class BlogModule {

}
