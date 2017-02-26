import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NavHeaderComponent} from "./nav-header/nav-header.component";
import {NavSidebarComponent} from "./nav-sidebar/nav-sidebar.component";
import {MaterialModule} from "@angular/material";
import {CovalentLayoutModule, CovalentCoreModule} from "@covalent/core";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    CovalentCoreModule,
    CovalentLayoutModule
  ],
  declarations: [
    NavHeaderComponent,
    NavSidebarComponent
  ],
  exports:[
    NavHeaderComponent,
    NavSidebarComponent
  ]
})
export class CoreModule {
}
