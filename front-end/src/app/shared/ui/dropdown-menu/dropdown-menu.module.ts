import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownMenuComponent } from './dropdown-menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DropdownMenuComponent],
  imports: [CommonModule, RouterModule],
  exports: [DropdownMenuComponent],
})
export class DropdownMenuModule {}
