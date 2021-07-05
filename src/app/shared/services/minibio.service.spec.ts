import { TestBed } from '@angular/core/testing';

import { MinibioService } from './minibio.service';

describe('MinibioService', () => {
  let service: MinibioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinibioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
