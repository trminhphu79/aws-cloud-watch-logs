import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { injectAppConfig } from '../shared/config/config.di';
import { FooterComponent, HeaderComponent } from '../layout';

import { CloudWatchLogsClient, PutLogEventsCommand } from "@aws-sdk/client-cloudwatch-logs";

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
  private readonly appConfig = injectAppConfig();

  // Create an instance of the CloudWatchLogsClient with AWS credentials
  client: CloudWatchLogsClient = null

  // Define the log group and log stream names
  logGroupName = "angular-app-logs";
  logStreamName = "AllLog";

  // Define the log events to be sent
  logEvents = [
    { timestamp: Date.now(), message: "ERROR properties is not undifined" },
  ];

  private _httpClient = inject(HttpClient)
  constructor() {
    console.log('appConfig initialize...', this.appConfig)
    this.client = new CloudWatchLogsClient({
      region: "ap-southeast-1", // Replace with your desired AWS region
      credentials: {
        accessKeyId: this.appConfig.awsAccessKeyId,
        secretAccessKey: this.appConfig.awsSecretAccessKey
      }
    })

    console.log('client...', this.client)
    // this.sendLogEvents();
    this._httpClient.get("http://localhost:4201/api/post")
      .subscribe({
        next: (res) => { },
        error: (err) => {
          console.log(err)
          this.sendLogEvents({ timestamp: Date.now(), message: err?.message ?? '' });
        }
      },
      )
  }


  // Create a function to send log events to CloudWatch Logs
  async sendLogEvents(object) {
    try {
      // Create the PutLogEventsCommand
      const command = new PutLogEventsCommand({
        logGroupName: this.logGroupName,
        logStreamName: this.logStreamName,
        logEvents: [object],
      });

      // Send the log events
      const response = await this.client.send(command);
      console.log("Log events successfully sent:", response);
    } catch (error) {
      console.error("Error sending log events:", error);
    }
  }

  // Call the  to send log events

}
