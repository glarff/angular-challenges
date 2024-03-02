import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

// new imports
import { NgTemplateOutlet } from '@angular/common';
import { ListItemRefDirective } from '../list-item/list-item-ref.directive';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgIf, NgFor, NgTemplateOutlet], // NgTemplateOutlet included in card component import
  host: {
    class:
      'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4 ml-2 mt-2',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent<T extends { id: number }> {
  @Input() list: any[] | null = null;
  @Input() image: string | null = null;

  @Output() addItem = new EventEmitter<void>();
  @ContentChild(ListItemRefDirective, { read: TemplateRef })
  listItemTemplate!: TemplateRef<{ $implicit: T }>;
}
