import { TestBed } from '@angular/core/testing';

import { TurmaIdService } from './turma-id.service';

describe('TurmaIdService', () => {
  let service: TurmaIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurmaIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
