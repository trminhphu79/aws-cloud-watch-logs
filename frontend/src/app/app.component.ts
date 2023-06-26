import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { Component, ErrorHandler, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, provideRouter } from '@angular/router';
import { GlobalErrorHandlerService } from './shared/services/global-error-handler.service';
import { provideAwsConfig } from './shared/config/aws-config.di';
import { AuthorizationInterceptor } from './shared/auth/interceptor.auth';
import { GlobalInterceptorErrorHandler } from './shared/services/global-error-interceptor-handler.service';

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
        provideAwsConfig(config),
        {
          provide: ErrorHandler,
          useClass: GlobalErrorHandlerService
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: GlobalInterceptorErrorHandler,
          multi: true
        }
      ]
    }).catch(err => console.error(err));
  }
}
