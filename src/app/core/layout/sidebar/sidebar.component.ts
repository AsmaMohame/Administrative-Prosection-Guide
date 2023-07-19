import { Component } from '@angular/core';
import { ROUTES } from './sidebar-routes.config';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  public menuItems: any[] = ROUTES;
  sideNavState: boolean = false;
  linkText: boolean = false;
  constructor(public settingsService: SettingsService) {}
  onSinenavToggle() {
    this.sideNavState = !this.sideNavState;
    this.linkText = this.sideNavState;
    this.settingsService.sideNavState$.next(this.sideNavState);
  }
}
