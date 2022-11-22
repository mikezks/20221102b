import {Component, Inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConfig, AppConfigService, APP_CONFIG } from './app.token';

@Component({
  selector: 'flight-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    // @Inject(APP_CONFIG) private appConfig: AppConfig,
    private appConfigService: AppConfigService,
    private route: ActivatedRoute) {

    route.queryParamMap.subscribe(
      queryParams => {
        appConfigService.setAppConfig({
          token: queryParams.get('token') || '',
          tendentId: queryParams.get('tendentId') || ''
        });
      }
    )
  }
}
