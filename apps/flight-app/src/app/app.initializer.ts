
// apps\deep-dive\src\assets\runtime\config.json

{
  "oem": "mazda"
}




// apps\deep-dive\src\app\config.service.ts

export interface Config {
  oem: string;
}


@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config = new BehaviorSubject<Config>({
    oem: 'default'
  });
}




// apps\deep-dive\src\app\app.module.ts

@NgModule({
   providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (http: HttpClient, cfgService: ConfigService) => () =>
          http.get<Config>('./assets/runtime/config.json').pipe(
          tap(config => cfgService.config.next(config))
        ),
      deps: [HttpClient, ConfigService],
      multi: true
    }
   ]
})
export class AppModule { }




// apps\deep-dive\src\app\flight-booking\flight.service.ts

@Injectable({
  providedIn: 'root',
  useFactory: (baseUrl: string, http: HttpClient, cfgService: ConfigService) => {
    if (cfgService.config.value.useDummy) {
      return new OemMazdaService(baseUrl, http);
    } else {
      return new OemToyotaService(baseUrl, http);
    }
  },
  deps: [
    [new Inject(BASE_URL)],
    HttpClient,
    ConfigService
  ]
})
export abstract class OemService {

  flights: Flight[] = [];

  abstract load(from: string, to: string): void;
  abstract find(from: string, to: string): Observable<Flight[]>;
  abstract delay(): void;
}
