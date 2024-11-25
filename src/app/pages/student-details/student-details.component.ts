import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Router } from '@angular/router';

export interface Aluno {
  nome: string;
  email: string;
  foto: string;
  link: string;
  comentario: string;
  campoLivre: string;
  curso: string;
  experiencias: ExperienciaAluno[];
}

export interface ExperienciaAluno {
  nome: string;
  funcao: string;
  inicio: string;
  fim: string;
}

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css',
})
export class StudentDetailsComponent {
  studentEmail!: string;
  aluno: Aluno = {
    nome: 'João Silva',
    foto: 'https://i.pinimg.com/236x/19/bd/eb/19bdeb93ad73ce5ead4800d254c51008.jpg', // Imagem de exemplo
    email: 'test@test.com',
    link: 'https://www.linkedin.com/in/joao-silva',
    comentario: 'Aluno dedicado e com grande potencial em tecnologia.',
    campoLivre:
      'João tem se destacado em projetos de software e também como mentor em hackathons.',
    curso: 'Ciência da Computação',
    experiencias: [
      {
        nome: 'Estágio de Desenvolvimento Web',
        funcao: 'Desenvolvedor Frontend',
        inicio: 'Jan 2023',
        fim: 'Dez 2023',
      },
      {
        nome: 'Projeto de Pesquisa em Inteligência Artificial',
        funcao: 'Pesquisador',
        inicio: 'Mar 2022',
        fim: 'Nov 2022',
      },
    ],
  };

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.studentEmail = navigation?.extras.state?.['studentEmail'];

    if (!this.studentEmail) {
      this.router.navigate(['']);
    }

    console.log(this.studentEmail);
  }
}
