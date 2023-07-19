import { TestBed } from '@angular/core/testing';

import { MuqarTypeService } from './muqar-type.service';

describe('MuqarTypeService', () => {
  let service: MuqarTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MuqarTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
