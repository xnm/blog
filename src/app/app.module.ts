import "hammerjs";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {MaterialModule} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {RouterModule} from "@angular/router";
import {AppComponent} from "./app.component";
import {LogFactory} from "./shared/log.factory";
import {CoreModule} from "./core/core.module";
import {ArticlesModule} from "./articles/articles.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule.forRoot([]),

    CoreModule,
    ArticlesModule
  ],
  providers: [
    LogFactory
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
