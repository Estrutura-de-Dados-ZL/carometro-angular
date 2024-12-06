import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { StudentCardComponent } from '../../components/student-card/student-card.component';
import { CommonModule } from '@angular/common';
import {
  FiltersComponent,
  IFilter,
} from '../../components/filters/filters.component';
import { AlunoService } from '../../services/aluno.service';
import { IAluno } from '../../interfaces/aluno';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    StudentCardComponent,
    CommonModule,
    FiltersComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  students: IAluno[] = []; 
  filtersVisible: boolean = false; 

  constructor(private alunoService: AlunoService) {} 

  ngOnInit(): void {
    this.getAllAlunos();
  }

  toggleFilters(): void {
    this.filtersVisible = !this.filtersVisible;

    Swal.fire({
      title: this.filtersVisible ? 'Filtros ativados!' : 'Filtros desativados!',
      text: this.filtersVisible
        ? 'Você pode aplicar filtros aos resultados.'
        : 'Os filtros foram ocultados.',
      icon: 'info',
      confirmButtonText: 'Entendido',
    });
  }

  filtrar(filtros: IFilter): void {
    // Chamada ao serviço para listar alunos filtrados
    this.alunoService.listarAlunos(filtros).subscribe({
      next: (filteredStudents) => {
        this.students = filteredStudents;

        // SweetAlert para indicar sucesso
        Swal.fire({
          title: 'Filtros aplicados com sucesso!',
          text: `Encontramos ${filteredStudents.length} aluno(s) com os critérios definidos.`,
          icon: 'success',
          confirmButtonText: 'Ok',
        });
      },
      error: (error) => {
        console.error('Erro ao aplicar filtros:', error);

        // SweetAlert para erros
        Swal.fire({
          title: 'Erro ao aplicar filtros',
          text: 'Algo deu errado ao filtrar os alunos. Tente novamente.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });
  }

  getAllAlunos(): void {
    // Chamada ao serviço para obter todos os alunos
    this.alunoService.listarAlunos().subscribe({
      next: (allStudents) => {
        this.students = allStudents;

        // SweetAlert para sucesso
        Swal.fire({
          title: 'Alunos carregados!',
          text: `Encontramos ${allStudents.length} aluno(s) no total.`,
          icon: 'success',
          confirmButtonText: 'Ok',
        });
      },
      error: (error) => {
        console.error('Erro ao carregar alunos:', error);

        // SweetAlert para erros
        Swal.fire({
          title: 'Erro ao carregar alunos',
          text: 'Não foi possível carregar os dados dos alunos. Verifique sua conexão.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });
  }
}
