import { Injectable } from '@angular/core';

@Injectable()
export class BrowserStorageService {
  getItem: (property: string) => string | object;
  setItem: (property: string, value: string | object) => void;
}

@Injectable()
export class BrowserStorageAsync {
  getItem: (property: string) => Promise<IContactPreference>;
  setItem: (property: string, value: string | object) => Promise<boolean>;
}
