import { Directive } from '@angular/core';

// Decorator used to mark the ListItemRefDirective class as an Angular directive and provide
//   configuration metadata for it
@Directive({
  standalone: true,
  selector: 'ng-template[listItemRef]',
})
export class ListItemRefDirective {}
