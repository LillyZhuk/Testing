import { Injectable } from '@angular/core';
import { BrowserStorageService } from './browser-storage.service';


export interface IContactPreference {
  key: string;
  value: string | object;
}

@Injectable()
export class PreferencesService {

  constructor(
    private browserStorage: BrowserStorageService
  ) { }

  public saveProperty(preference: IContactPreference) {
    if (!preference.key.length) {
      throw  new Error('saveProperty requires a non-blank property name');
    }
    this.browserStorage.setItem(preference.key, preference.value);
  }

}
