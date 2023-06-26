import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, catchError, retry, throwError } from "rxjs";
import { AWS_CLOUD_WATCH } from "../constant";
import { AWSCloudWatchLogsService } from "./aws-cloud-watch.service";

@Injectable()
export class GlobalInterceptorErrorHandler implements HttpInterceptor {
    private _awsCloudWatchLogsService = inject(AWSCloudWatchLogsService);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMsg = '';
                errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                this._awsCloudWatchLogsService.sendLogEvents({
                    logGroupName: AWS_CLOUD_WATCH.ANGULAR_APP_LOGS_GROUP.NAME,
                    logStreamName: AWS_CLOUD_WATCH.ANGULAR_APP_LOGS_GROUP.STREAM.HTTP_SERVER_STREAM,
                    logEvents: [{ timestamp: new Date().getTime(), message: errorMsg }]
                })
                return throwError(() => error)
            }))
    }
}