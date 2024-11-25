import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IAluno } from '../interfaces/aluno';
import { IAlunoDetails } from '../interfaces/aluno-details';

@Injectable({
  providedIn: 'root',
})
export class AlunoService {
  private apiUrl = 'http://localhost:8080/aluno';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  listarAlunos(filtros?: { [key: string]: any }): Observable<IAluno[]> {
    let url = `${this.apiUrl}/buscarTodos`;

    if (filtros) {
      const queryString = Object.entries(filtros)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
      url = `${url}?${queryString}`;
    }

    return this.http.get<IAluno[]>(url).pipe(
      tap(() => console.log('Alunos carregados com sucesso!')),
      catchError((error) => {
        console.error('Erro ao buscar alunos:', error);
        return throwError(error);
      })
    );
  }

  buscarAlunoPorEmail(email: string): Observable<IAlunoDetails | null> {
    return this.http.get<IAlunoDetails>(`${this.apiUrl}/${email}`).pipe(
      map((aluno) => aluno),
      catchError((error) => {
        if (error.status === 400 || error.status === 404) {
          console.warn('Aluno não encontrado!');
          return of(null);
        }
        return throwError(error);
      })
    );
  }

  criarAluno(aluno: IAluno): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}`, aluno, {
      headers: this.getAuthHeaders(),
    }).pipe(
      tap(() => console.log('Aluno criado com sucesso!')),
      catchError((error) => {
        console.error('Erro ao criar aluno:', error);
        return throwError(error);
      })
    );
  }

  atualizarAluno(aluno: IAluno): Observable<any> {
    return this.http.put(`${this.apiUrl}`, aluno, {
      headers: this.getAuthHeaders(),
    }).pipe(
      tap(() => console.log('Aluno atualizado com sucesso!')),
      catchError((error) => {
        console.error('Erro ao atualizar aluno:', error);
        return throwError(error);
      })
    );
  }

  deletarAluno(email: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${email}`, {
      headers: this.getAuthHeaders(),
    }).pipe(
      tap(() => console.log('Aluno excluído com sucesso!')),
      catchError((error) => {
        console.error('Erro ao excluir aluno:', error);
        return throwError(error);
      })
    );
  }

  verificarExistenciaAluno(email: string): Observable<boolean> {
    return this.buscarAlunoPorEmail(email).pipe(
      map((aluno) => aluno !== null),
      catchError((error) => {
        if (error.status === 404) {
          return of(false);
        }
        return throwError(error);
      })
    );
  }
}
