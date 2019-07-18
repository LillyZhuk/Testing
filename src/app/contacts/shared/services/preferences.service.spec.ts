import { TestBed, inject } from '@angular/core/testing';

import { PreferencesService } from './preferences.service';

describe('PreferencesService', () => {
  beforeEach(() => { /** The TestBed module is configured before every test.*/
    TestBed.configureTestingModule({
      providers: [PreferencesService]
    });
  });

  it('should be created', inject( /** The first test only checks that the service test setup is right.*/
    [PreferencesService], (service: PreferencesService) => {
    expect(service).toBeTruthy();
  }));
});
