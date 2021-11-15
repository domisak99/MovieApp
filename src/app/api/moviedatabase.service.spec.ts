import { TestBed } from '@angular/core/testing';

import { MoviedatabaseService } from './moviedatabase.service';

describe('MoviedatabaseService', () => {
  let service: MoviedatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviedatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
