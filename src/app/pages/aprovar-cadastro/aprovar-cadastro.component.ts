import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TableComponent } from '../../components/table/table.component';
import { StudentDetailsComponent } from '../student-details/student-details.component';
import { IAlunoDetails } from '../../interfaces/aluno-details';
import { IAluno } from '../../interfaces/aluno';
import { AlunoService } from '../../services/aluno.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aprovar-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    DialogModule,
    FormsModule,
    NavbarComponent,
  ],
  templateUrl: './aprovar-cadastro.component.html',
  styleUrl: './aprovar-cadastro.component.css',
})
export class AprovarCadastroComponent implements OnInit {
  colunas = ['nome', 'email', 'curso'];
  alunos: IAluno[] = [];
  alunoSelecionado: IAluno | undefined;
  displayModal = false;

  constructor(
    private alunoService: AlunoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarAlunos();
  }

  carregarAlunos(): void {
    this.alunoService.getPendentes().subscribe({
      next: (alunos) => {
        this.alunos = alunos;
      },
      error: () => {
        Swal.fire('Erro!', 'Erro ao carregar alunos pendentes.', 'error');
      },
    });
  }

  abrirModal(aluno: IAluno): void {
    this.alunoSelecionado = aluno;
    this.displayModal = true;
  }

  aceitarCadastro(): void {
    if (this.alunoSelecionado) {
      const email = this.alunoSelecionado.email;
      this.alunoService.atualizarAlunoPendente(email, false).subscribe({
        next: () => {
          Swal.fire('Sucesso!', 'Cadastro aprovado com sucesso!', 'success');
          this.carregarAlunos();
          this.displayModal = false;
        },
        error: () => {
          Swal.fire('Erro!', 'Erro ao aprovar o cadastro.', 'error');
        },
      });
    }
  }

  recusarCadastro(): void {
    if (this.alunoSelecionado) {
      const email = this.alunoSelecionado.email;
      this.alunoService.atualizarAlunoPendente(email, true).subscribe({
        next: () => {
          Swal.fire('Sucesso!', 'Cadastro recusado com sucesso!', 'success');
          this.carregarAlunos();
          this.displayModal = false;
        },
        error: () => {
          Swal.fire('Erro!', 'Erro ao recusar o cadastro.', 'error');
        },
      });
    }
  }
}
