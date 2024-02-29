import { ModuleMetadata } from '@nestjs/common';

export const ConfigGoogleApisInjectionToken = 'ConfigGoogleApisInjectionToken';

export type AuthModuleConfig = {
  clientSecret: string;
  clientId: string;
};

export interface IGoogleApisAsyncConfig
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (
    ...args: unknown[]
  ) => Promise<AuthModuleConfig> | AuthModuleConfig;
  inject?: any[];
}
