import { TestBed } from '@angular/core/testing';

import { AutonomoService } from './autonomo.service';

describe('AutonomoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutonomoService = TestBed.get(AutonomoService);
    expect(service).toBeTruthy();
  });
});
