import { ICurso } from "./curso";

export interface ITurmaId {
    cursoId: number;
    ano: string;
    semestre: string;
}

export interface ITurma {
    turmaId: ITurmaId;
    curso: ICurso;
}