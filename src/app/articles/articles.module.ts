import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HomeComponent} from "./home/home.component";
import {RouterModule} from "@angular/router";
import {articlesRoutes} from "./aritcles.routes";
import {MaterialModule, MaterialRootModule} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(articlesRoutes)
  ],
  declarations: [HomeComponent]
})
export class ArticlesModule {
}
