import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent  implements OnInit{

  mobileQuery!: MediaQueryList;
  constructor(
    public settingService: SettingsService,
    private media: MediaMatcher
  ) {}

  ngOnInit() {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
  }

}
