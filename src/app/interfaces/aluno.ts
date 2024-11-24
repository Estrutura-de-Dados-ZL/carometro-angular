import { IExperienciaAluno } from './experiencia-aluno';
import { ITurma } from './turma';

export interface IAluno {
    foto: string;
    link: string;
    comentario: string;
    campoLivre: string;
    permissaoDados: boolean;
    pendente: boolean;
    turma: ITurma;
    experiencias: IExperienciaAluno[];
    }