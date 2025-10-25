import { HttpInterceptorFn } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Translation, TranslocoInterceptor } from '@ngneat/transloco';

@Injectable({ providedIn: 'root' })
export class terracitaTranslocoInterceptor implements TranslocoInterceptor {
  preSaveTranslation(translation: any, lang: string): any {
    console.log(`Pre-saving translating for ${lang}:`, translation);
    return translation;
  }
  preSaveTranslationKey(key: string, value: string, lang: string): string {
    console.log(`Pre-saving key "${key}" with value "${value}" for ${lang}`);
    return key;
  }
  intercept(translations: any, lang: string): any {
    console.log(`Loaded translations for ${lang}:`, translations);
    return translations;
  }

}