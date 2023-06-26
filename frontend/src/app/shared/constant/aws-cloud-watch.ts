export const AWS_CLOUD_WATCH = {
    ANGULAR_APP_LOGS_GROUP: {
        NAME: 'angular-app-logs',
        STREAM: {
            HTTP_SERVER_STREAM: 'http_server_error',
            HTTP_CLIENT_STREAM:'http_client_error',
            GLOBAL_ERROR_STREAM: 'global_error'
        }
    },
}