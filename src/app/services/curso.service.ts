import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ICurso } from '../interfaces/curso';
import { ApiRespostaDto } from '../interfaces/api-resposta-dto';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private apiUrl = 'http://localhost:8080/curso';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  listarCursos(): Observable<ICurso[]> {
    return this.http.get<ICurso[]>(`${this.apiUrl}/buscarTodos`).pipe(
      tap(() => console.log('Cursos carregados com sucesso!')),
      catchError((error) => {
        console.error('Erro ao listar cursos:', error);
        return throwError(error);
      })
    );
  }

  buscarCursoPorId(id: number): Observable<ApiRespostaDto<ICurso>> {
    return this.http.get<ApiRespostaDto<ICurso>>(`${this.apiUrl}/${id}`).pipe(
      tap((resposta) => console.log(`Curso encontrado: ${resposta.data?.nome}`)),
      catchError((error) => {
        console.error('Erro ao buscar curso por ID:', error);
        return throwError(error);
      })
    );
  }

  criarCurso(curso: ICurso): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}`, curso, {
      headers: this.getAuthHeaders(),
    }).pipe(
      tap(() => console.log('Curso criado com sucesso!')),
      catchError((error) => {
        console.error('Erro ao criar curso:', error);
        return throwError(error);
      })
    );
  }

  atualizarCurso(curso: ICurso): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}`, curso, {
      headers: this.getAuthHeaders(),
    }).pipe(
      tap(() => console.log('Curso atualizado com sucesso!')),
      catchError((error) => {
        console.error('Erro ao atualizar curso:', error);
        return throwError(error);
      })
    );
  }

  deletarCurso(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    }).pipe(
      tap(() => console.log('Curso excluído com sucesso!')),
      catchError((error) => {
        console.error('Erro ao excluir curso:', error);
        return throwError(error);
      })
    );
  }
}
