import { TestBed, inject } from '@angular/core/testing';

import { PreferencesService } from './preferences.service';
import { BrowserStorageService } from './browser-storage.service';

import { logging } from 'selenium-webdriver';
import Preferences = logging.Preferences;

/** Creates BrowserStorageMock */
class BrowserStoregeMock {
  getItem = (property: string) => ({
    key: 'testProp',
    value: 'testValue'
  });
  setItem = ({
    key: key,
    value: value
  }) => {}
}

describe('PreferencesService', () => {
  beforeEach(() => { /** The TestBed module is configured before every test.*/
    TestBed.configureTestingModule({
      /** Configures the TestBed dependency injection to use BrowserStorageMock instead of the real service */
      providers: [PreferencesService, {
        provide: BrowserStorageService, useClass: BrowserStoregeMock
      }]
    });
  });

  it('should be created', inject( /** The first test only checks that the service test setup is right.*/
    [PreferencesService], (service: PreferencesService) => {
    expect(service).toBeTruthy();
  }));

  describe('save preferences', () => {

    it('should save a preferences',
      inject([PreferencesService, BrowserStorageService], (service:
        PreferencesService, browserStorage: BrowserStoregeMock) => { /** Uses inject to get the BrowserStorageMock */
          spyOn(browserStorage, 'setItem').and.callThrough(); /** Adds a spy to browserStorage.setItem */
          service.saveProperty({key: 'myProperty', value: 'myValue'});
          expect(browserStorage.setItem)
            /** Checks the spy to make sure it was called  from saveProperty() */
            .toHaveBeenCalledWith('myProperty', 'myValue');
    }));

    it('saveProperty should require a non-zero length key',
      inject([PreferencesService], (service: PreferencesService) => {

        const shouldThrow = () => {
          service.saveProperty({ key: '', value: 'foo' });
        };

        expect(shouldThrow).toThrowError();
      }));
  });
});
