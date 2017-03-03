import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "@angular/material";
import {CovalentLayoutModule, CovalentCoreModule} from "@covalent/core";
import {NavigationComponent} from "./navigation/navigation.component";
import {BlogModule} from "../blog/blog.module";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    CovalentCoreModule,
    CovalentLayoutModule,

    BlogModule
  ],
  declarations: [
    NavigationComponent
  ],
  exports: [
    NavigationComponent
  ],
  providers: [
  ]
})
export class CoreModule {
}
