import { TestBed } from '@angular/core/testing';

import { ContactserService } from './contactser.service';

describe('ContactserService', () => {
  let service: ContactserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
