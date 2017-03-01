import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BlogConfigService} from "./shared/blog-config.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [
    BlogConfigService
  ]
})
export class BlogModule {
}
