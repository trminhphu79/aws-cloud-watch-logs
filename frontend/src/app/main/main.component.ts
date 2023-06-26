import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { injectAppConfig } from '../shared/config/config.di';
import { FooterComponent, HeaderComponent } from '../layout';

import { CloudWatchLogsClient, PutLogEventsCommand } from "@aws-sdk/client-cloudwatch-logs";
import { AWSCloudWatchLogsService } from '../shared/services';
import { AWS_CLOUD_WATCH } from '../shared/constant';

@Component({
  selector: 'tmp-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    HeaderComponent,
    FooterComponent
  ],
})
export class MainComponent {

  private _httpClient = inject(HttpClient);
  constructor() {}

  showLog() {
    throw new Error("Global Error....")
  }

  show403() {
    this._httpClient.get("http://localhost:4201/api/login")
      .subscribe()
  }

  show404() {
    this._httpClient.get("http://localhost:4201")
      .subscribe()
  }

  show500() {
    this._httpClient.get("http://localhost:4201/api/users")
      .subscribe()
  }
}
