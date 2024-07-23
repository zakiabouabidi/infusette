import { TestBed } from '@angular/core/testing';

import { CoffretService } from './coffret.service';

describe('CoffretService', () => {
  let service: CoffretService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoffretService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
