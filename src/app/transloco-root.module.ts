import { Inject, Injectable, NgModule } from "@angular/core";
import { DefaultFallbackStrategy, DefaultTranspiler, TRANSLOCO_CONFIG, TRANSLOCO_FALLBACK_STRATEGY, TRANSLOCO_INTERCEPTOR, TRANSLOCO_LOADER, TRANSLOCO_MISSING_HANDLER, TRANSLOCO_TRANSPILER, translocoConfig, TranslocoModule } from "@ngneat/transloco";
import { TranslocoHttpLoader } from "./transloco-loader";
import { terracitaTranslocoInterceptor } from "./util/terracita-transloco-interceptor";

@Injectable({ providedIn: 'root' })
export class MyMissingHandler {
    handle(key: string): string {
        console.warn(`Missing translation: ${key}`);
        return key;
    }
}

@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
        provide: TRANSLOCO_CONFIG,
        useValue: translocoConfig({
            availableLangs: ['es', 'en'],
            defaultLang: 'es',
            reRenderOnLangChange: true,
            prodMode: false
        })
    },
    {provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader},
    {provide: TRANSLOCO_TRANSPILER, useClass: DefaultTranspiler},
    {provide: TRANSLOCO_MISSING_HANDLER, useClass: MyMissingHandler},
    {provide: TRANSLOCO_INTERCEPTOR, useClass: terracitaTranslocoInterceptor},
    {provide: TRANSLOCO_FALLBACK_STRATEGY, useClass: DefaultFallbackStrategy}
  ]
})
export class TranslocoRootModule{ }