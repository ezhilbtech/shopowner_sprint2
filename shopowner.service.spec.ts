import { TestBed } from '@angular/core/testing';

import { ShopownerService } from './shopowner.service';

describe('StudentService', () => {
  let service: ShopownerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopownerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
