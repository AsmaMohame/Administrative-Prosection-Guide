import { Component, Input, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn!: boolean;
  @Input() snav!: MatSidenav;
  name!: string | null; 
  constructor(private route: Router, private settingService: SettingsService) { }
  ngOnInit(): void {
    if (this.settingService.getToken()) {
      this.isLoggedIn = true;
    }
  }

  menuClick() {
    this.snav.toggle();
  }

}
