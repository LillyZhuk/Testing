/** Imports asynchronous testing methods */
import { TestBed, inject, fakeAsync, flushMicrotasks } from '@angular/core/testing';

import { PreferencesAsyncService } from './preferences-async.service';
import { BrowserStorageAsync } from './browser-storage.service';

class BrowserStorageAsyncMock {
  getItem = (property: string) => {
    return Promise.resolve({
      key: 'testProp',
      value: 'testValue'
    });
  }
  setItem = ({
    key: key,
    value: value
  }) => Promise.resolve(true)
}

describe('PreferencesAsyncService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreferencesAsyncService, {
        provide: BrowserStorageAsync, useClass: BrowserStorageAsyncMock
      }]
    });
  });

  it('should be created', inject([PreferencesAsyncService], (service: PreferencesAsyncService) => {
    expect(service).toBeTruthy();
  }));

  it('should get a value', fakeAsync(inject(
    [PreferencesAsyncService, BrowserStorageAsync],
    (service: PreferencesAsyncService, browserStorage: BrowserStorageAsyncMock) => {
      spyOn(browserStorage, 'getItem').and.callThrough();

      let results, error;

      service.getPropertyAsync('testProp') /** Invokes the promise and assigns the results */
        .then(val => results = val)
        .catch(err => error = err);
      flushMicrotasks(); /** Processes the promise microtasks */

      expect(results.key).toEqual('testProp');
      expect(results.value).toEqual('testValue');
      expect(error).toBeUndefined(); /** Ensures the error value wasn’t assigned */
      expect(browserStorage.getItem).toHaveBeenCalledWith('testProp');
    }
  )));

  it('should throw an error if the key is missing', fakeAsync(inject([PreferencesAsyncService, BrowserStorageAsync],
    (service: PreferencesAsyncService) => {
    let result, error;
    service.getPropertyAsync('')
      .then(value => result = value)
      .catch((err) => error = err);

    flushMicrotasks();
    expect(result).toBeUndefined();
    expect(error).toEqual('getPropertyAsync requires a property name');
    })));
});
