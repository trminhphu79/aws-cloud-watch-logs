import { HttpRequest, HttpHandlerFn, HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, finalize, throwError } from "rxjs";
import { AWSCloudWatchLogsService } from "../services";
import { AWS_CLOUD_WATCH } from "../constant";

export function AuthorizationInterceptor(request: HttpRequest<unknown>,
    next: HttpHandlerFn) {
   
}