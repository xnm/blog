import "./polyfills.ts";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {enableProdMode} from "@angular/core";
import {environment} from "./environments/environment";
import {AppModule} from "./app/app.module";
import * as _ from "lodash";

if (environment.production) {
  enableProdMode();

  //enable https redirect
  if (environment.https && environment.https.enable && environment.https.force) {
    let currentProtocol = location.protocol;
    let targetProtocol = 'https:';
    if (!_.isEqual(currentProtocol, targetProtocol)) {
      location.href = targetProtocol + '//' + location.hostname + location.pathname;
    }
  }
}


platformBrowserDynamic().bootstrapModule(AppModule);
