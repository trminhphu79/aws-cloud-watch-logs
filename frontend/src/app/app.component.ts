import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, provideRouter } from '@angular/router';
import { provideAppConfig } from './shared/config/config.di';

@Component({
  selector: 'tmp-root',
  template: '<router-outlet></router-outlet>',
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class AppComponent {
  static bootstrap(config?: any) {
    bootstrapApplication(this, {
      providers: [
        provideRouter([
          {
            path: "",
            loadComponent() {
              return import('../app/main/main.component').then((c) => c.MainComponent)
            },
            loadChildren: () =>
              import('../app/main/main.routes').then((m) => m.mainRoutes),
          }
        ]),
        importProvidersFrom(
          BrowserAnimationsModule,
          HttpClientModule
        ),
        provideAppConfig(config),
      ]
    }).catch(err => console.error(err));
  }
}
