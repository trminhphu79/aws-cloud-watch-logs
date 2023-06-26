
import { Injectable } from "@angular/core";
import { CloudWatchLogsClient, PutLogEventsCommand, PutLogEventsCommandInput } from "@aws-sdk/client-cloudwatch-logs";
import { AppConfig } from "../config/config.model";
import { from } from "rxjs";
import { injectAwsConfig } from '../config/aws-config.di';

@Injectable({ providedIn: 'root' })
export class AWSCloudWatchLogsService {
    private _client: CloudWatchLogsClient = null;
    private _awsConfig = injectAwsConfig();

    constructor() {
        if (this._awsConfig) {
            this.initalAwsCloudWatchCLient(this._awsConfig);
        }
    }

    initalAwsCloudWatchCLient(configure: AppConfig) {
        this._client = new CloudWatchLogsClient({
            region: configure.awsRegion,
            credentials: {
                accessKeyId: configure.awsAccessKeyId,
                secretAccessKey: configure.awsSecretAccessKey
            }
        })
    }

    sendLogEvents(input: PutLogEventsCommandInput) {
        const command = new PutLogEventsCommand({
            logGroupName: input.logGroupName,
            logStreamName: input.logStreamName,
            logEvents: input.logEvents,
        });
        from(this._client.send(command)).subscribe()
    }
}