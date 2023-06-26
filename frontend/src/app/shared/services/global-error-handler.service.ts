import { AWS_CLOUD_WATCH } from './../constant/aws-cloud-watch';
import { ErrorHandler, Injectable, Injector, inject } from "@angular/core";
import { Router } from "@angular/router";
import { AWSCloudWatchLogsService } from "./aws-cloud-watch.service";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
    private _awsCloudWatchService: AWSCloudWatchLogsService = inject(AWSCloudWatchLogsService);

    constructor(public injector: Injector) { }
    handleError(error: any): void {
        if (!(error instanceof HttpErrorResponse)) {
            this._awsCloudWatchService.sendLogEvents({
                logGroupName: AWS_CLOUD_WATCH.ANGULAR_APP_LOGS_GROUP.NAME,
                logStreamName: AWS_CLOUD_WATCH.ANGULAR_APP_LOGS_GROUP.STREAM.GLOBAL_ERROR_STREAM,
                logEvents: [{ timestamp: new Date().getTime(), message: error?.message }]
            });

            console.error(`Global error handler ${error}`)
        }
    }
}