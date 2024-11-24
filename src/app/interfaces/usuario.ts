import { IRole } from './role';

export interface IUsuario {
    id: number;
    nome: string;
    email: string;
    senha: string;
    roles: IRole[];
}