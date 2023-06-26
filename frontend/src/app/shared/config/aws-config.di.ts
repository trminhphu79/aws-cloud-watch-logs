import { createInjectionToken } from "../utils";
import { AWSCloudWatchClientConfig } from "./aws-config.model";

export const [injectAwsConfig, provideAwsConfig] =
  createInjectionToken<AWSCloudWatchClientConfig>('AWSCloudWatchClientConfig');