import { ICurso } from './curso';
import { IExperienciaAluno } from './experiencia-aluno';
import { ITurma } from './turma';

export interface IAluno {
    nome: string;
    foto: string;
    email: string;
    link: string;
    comentario: string;
    campoLivre: string;
    permissaoDados: boolean;
    pendente: boolean;
    turma: ITurma;
    experiencias: IExperienciaAluno[];
    curso: ICurso;
    }