import { TestBed } from '@angular/core/testing';

import { MuqarService } from './muqar.service';

describe('MuqarService', () => {
  let service: MuqarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MuqarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
