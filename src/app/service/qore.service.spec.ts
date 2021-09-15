import { TestBed } from '@angular/core/testing';

import { QoreService } from './qore.service';

describe('QoreService', () => {
  let service: QoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
