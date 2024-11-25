export interface ExperienciaAluno {
    nome: string;
    funcao: string;
    inicio: string;
    fim: string;
  }
  
  export interface IAlunoDetails {
    nome: string;
    email: string;
    foto: string;
    link: string;
    comentario: string;
    campoLivre: string;
    curso: string;
    experiencias: ExperienciaAluno[];
  }
  