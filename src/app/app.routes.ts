import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { StudentDetailsComponent } from './pages/student-details/student-details.component';
import { CadastroAlunoComponent } from './pages/cadastro-aluno/cadastro-aluno.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'alunoDetalhes', component: StudentDetailsComponent },
  { path: 'cadastroAluno', component: CadastroAlunoComponent },
];
