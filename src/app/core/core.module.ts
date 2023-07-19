import { NgModule, Optional, SkipSelf } from '@angular/core';
import { EnsureModuleLoadedOnceGuard } from './loaded-once-guard';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { RootComponent } from './layout/root/root.component';
import { HeaderComponent } from './layout/header/header.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptorService } from './services/error-interceptor.service';

@NgModule({
  declarations: [SidebarComponent ,HeaderComponent ,RootComponent],

  imports: [SharedModule, RouterModule.forChild([])],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
