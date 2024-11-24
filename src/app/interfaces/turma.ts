import { ICurso } from "./curso";
import { ITurmaId } from "./turma-id";

export interface ITurma {
    turmaId: ITurmaId;
    curso: ICurso;
}