/* Created by Aquariuslt on 2017-03-18. */
import {NavigationLink} from "./navigation-link.model";
import * as _ from "lodash";
export class NavigationMenu {

  label: string;
  links: Array<NavigationLink>;
  priority: number;

  private DEFAULT_PRIORITY = 0;

  constructor(data?) {
    let self = this;
    if (data) {
      self.label = data.label;
      self.links = [];
      if (!_.isUndefined(data.priority)) {
        self.priority = data.priority;
      } else {
        self.priority = self.DEFAULT_PRIORITY;
      }

      _.each(data.links, function (link) {
        self.links.push(new NavigationLink(link));
      });
    }
  }


}
