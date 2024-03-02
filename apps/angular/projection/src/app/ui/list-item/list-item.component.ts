import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  standalone: true,
  host: {
    class: 'border-grey-300 flex justify-between border px-2 py-1',
  }, // provide the tailwind css classes as host instead of defined in template
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  @Output() deleteItem = new EventEmitter<void>();
}
