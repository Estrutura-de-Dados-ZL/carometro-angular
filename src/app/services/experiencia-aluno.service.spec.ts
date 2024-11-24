import { TestBed } from '@angular/core/testing';

import { ExperienciaAlunoService } from './experiencia-aluno.service';

describe('ExperienciaAlunoService', () => {
  let service: ExperienciaAlunoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExperienciaAlunoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
