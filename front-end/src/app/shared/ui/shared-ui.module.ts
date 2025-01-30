import { NgModule } from '@angular/core';
import { TextInputModule } from './text-input/text-input.module';
import { NavModule } from './nav/nav.module';
import { DropdownMenuModule } from './dropdown-menu/dropdown-menu.module';
@NgModule({
  imports: [TextInputModule, NavModule, DropdownMenuModule],
  exports: [TextInputModule, NavModule, DropdownMenuModule],
})
export class SharedUiModule {}
