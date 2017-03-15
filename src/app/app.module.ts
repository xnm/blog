import "hammerjs";
import "rxjs";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {MaterialModule} from "@angular/material";
import {RouterModule} from "@angular/router";
import {AppComponent} from "./app.component";
import {LogFactory} from "./shared/log.factory";
import {CovalentLayoutModule, CovalentCoreModule} from "@covalent/core";
import {CoreModule} from "./core/core.module";
import {BlogModule} from "./blog/blog.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    RouterModule.forRoot([]),
    CovalentCoreModule.forRoot(),
    CovalentLayoutModule.forRoot(),

    CoreModule,
    BlogModule
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
