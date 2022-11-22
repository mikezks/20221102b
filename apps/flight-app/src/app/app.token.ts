import { Injectable, InjectionToken } from "@angular/core";

export interface AppConfig {
  lang: string;
  tendentId: string;
  token: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG', {
  providedIn: 'root',
  factory: () => ({
    lang: 'de',
    tendentId: 'ABCD1234',
    token: '3445kjkj-345reert'
  })
});

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  appConfig: AppConfig = {
    lang: 'de',
    tendentId: 'ABCD1234',
    token: '3445kjkj-345reert'
  };

  setAppConfig(cfg: Partial<AppConfig>) {
    this.appConfig = {
      ...this.appConfig,
      ...cfg
    };
  }
}
