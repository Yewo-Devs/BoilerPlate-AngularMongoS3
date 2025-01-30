import { trigger, transition, style, animate } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu',
  standalone: false,
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.css',
  animations: [
    trigger('dropdownAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scaleY(0)', transformOrigin: 'top' }),
        animate(
          '200ms ease-out',
          style({ opacity: 1, transform: 'scaleY(1)' })
        ),
      ]),
      transition(':leave', [animate('150ms ease-in', style({ opacity: 0 }))]),
    ]),
  ],
})
export class DropdownMenuComponent {
  @Input() items: any[];
  @Input() left: boolean = false;
  visible = false;
}
