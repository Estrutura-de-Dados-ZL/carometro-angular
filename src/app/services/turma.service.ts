import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITurma, ITurmaId } from '../interfaces/turma';
import { ApiRespostaDto } from '../interfaces/api-resposta-dto';


@Injectable({
  providedIn: 'root',
})
export class TurmaService {
  private readonly API_URL = 'http://localhost:8080/turma';

  constructor(private http: HttpClient) {}

  /**
   * Busca todas as turmas.
   */
  listarTurmas(): Observable<ITurma[]> {
    return this.http.get<ITurma[]>(`${this.API_URL}/buscarTodos`);
  }

  /**
   * Busca uma turma pelo ID composto (cursoId, ano, semestre).
   * @param turmaId Identificador composto da turma.
   */
  buscarTurmaPorId(turmaId: ITurmaId): Observable<ApiRespostaDto<ITurma>> {
    const { cursoId, ano, semestre } = turmaId;
    return this.http.get<ApiRespostaDto<ITurma>>(
      `${this.API_URL}/${cursoId}/${ano}/${semestre}`
    );
  }

  /**
   * Cria uma nova turma.
   * @param turma Dados da turma.
   */
  criarTurma(turma: ITurma): Observable<string> {
    return this.http.post<string>(this.API_URL, turma);
  }

  /**
   * Atualiza uma turma existente.
   * @param turma Dados da turma atualizada.
   */
  atualizarTurma(turma: ITurma): Observable<string> {
    return this.http.put<string>(this.API_URL, turma);
  }

  /**
   * Deleta uma turma pelo ID composto (cursoId, ano, semestre).
   * @param turmaId Identificador composto da turma.
   */
  deletarTurma(turmaId: ITurmaId): Observable<string> {
    const { cursoId, ano, semestre } = turmaId;
    return this.http.delete<string>(
      `${this.API_URL}/${cursoId}/${ano}/${semestre}`
    );
  }
}
