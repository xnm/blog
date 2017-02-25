import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NavigationComponent} from "./navigation/navigation.component";
import {MaterialModule} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {CovalentCoreModule} from "@covalent/core";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    CovalentCoreModule
  ],
  declarations: [
    NavigationComponent
  ],
  exports: [
    NavigationComponent
  ]
})
export class CoreModule {
}
