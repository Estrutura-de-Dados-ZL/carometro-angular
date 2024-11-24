import { TestBed } from '@angular/core/testing';

import { VcursoService } from './curso.service';

describe('VcursoService', () => {
  let service: VcursoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VcursoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
