import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavComponent } from './nav.component';
import { DropdownMenuModule } from '../dropdown-menu/dropdown-menu.module';

@NgModule({
  declarations: [NavComponent],
  imports: [CommonModule, RouterModule, DropdownMenuModule],
  exports: [NavComponent],
})
export class NavModule {}
