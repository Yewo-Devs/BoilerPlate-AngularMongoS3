import { Component, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../../data-access/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { PreferencesService } from '../../../shared/services/preferences-service/preferences.service';
import { CommonModule } from '@angular/common';
import { SharedUiModule } from '../../../shared/ui/shared-ui.module';
import { DropdownMenuComponent } from '../../../shared/ui/dropdown-menu/dropdown-menu.component';

@Component({
  imports: [CommonModule, SharedUiModule],
  standalone: true,
  templateUrl: './recents.component.html',
  styleUrl: './recents.component.css',
})
export class RecentsComponent {
  @ViewChildren('menuq') menus!: QueryList<DropdownMenuComponent>;

  items: any[] = [
    {
      name: 'Test 1',
      lastUpdated: '2021-09-01T00:00:00',
    },
    {
      name: 'Test 2',
      lastUpdated: '2021-09-01T00:00:00',
    },
  ];

  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private toastService: ToastrService,
    private preferencesService: PreferencesService
  ) {}

  ngOnInit(): void {
    this.dashboardService
      .getItems(this.preferencesService.getPreferences().user.id)
      .subscribe(
        (response: any) => {
          this.items = response;
        },
        (error) => {
          this.toastService.error('Something went wrong please try again');
        }
      );
  }

  menu(offer: any, event: any, index: number) {
    const menu = this.menus.toArray()[index]; // Get the specific menu by index
    menu.visible = !menu.visible;
  }
}
