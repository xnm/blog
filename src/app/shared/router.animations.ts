import {trigger} from "@angular/core";


export function routerTransition() {
  return trigger('routerTransition', [
    // transition(':enter', [
    //   style({transform: 'translateX(100%)'}),
    //   animate('0.5s ease-in-out', style({transform: 'translateY(0%)'}))
    // ]),
    // transition(':leave', [
    //   style({transform: 'translateX(0%)'}),
    //   animate('0.5s ease-in-out', style({transform: 'translateY(-100%)'}))
    // ])
  ]);
}
