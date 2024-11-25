import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TableComponent } from '../../components/table/table.component';
import { CursoService } from '../../services/curso.service';
import { ICurso } from '../../interfaces/curso'; 
import Swal from 'sweetalert2';

const CURSO_CADASTRO = { id: 0, nome: '' };

@Component({
  selector: 'app-curso',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    NavbarComponent,
    TableComponent,
  ],
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css'],
})
export class CursoComponent implements OnInit {
  colunas = ['id', 'nome'];

  showModalEditar = false;
  showModalDeletar = false;
  showModalCadastrar = false;
  cursoCadastro = { ...CURSO_CADASTRO };
  cursoSelecionado!: ICurso;
  cursos: ICurso[] = [];
  isLoadingSearch = false;
  termoPesquisa = '';

  constructor(private cursoService: CursoService) {}

  ngOnInit(): void {
    this.carregarCursos();
  }

  abrirModalEditar(curso: ICurso): void {
    this.cursoSelecionado = { ...curso };
    this.showModalEditar = true;
  }

  abrirModalCadastrar(): void {
    this.cursoCadastro = { ...CURSO_CADASTRO };
    this.showModalCadastrar = true;
  }

  abrirModalDeletar(curso: ICurso): void {
    this.cursoSelecionado = curso;
    this.showModalDeletar = true;
  }

  cadastrarCurso(): void {
    if (this.cursoCadastro.nome) {
      this.cursoService.criarCurso(this.cursoCadastro).subscribe({
        next: () => {
          Swal.fire('Sucesso', 'Curso cadastrado com sucesso!', 'success');
          this.carregarCursos();
          this.showModalCadastrar = false;
        },
        error: () => {
          Swal.fire('Erro', 'Falha ao cadastrar curso.', 'error');
        },
      });
    }
  }

  editarCurso(): void {
    this.cursoService.atualizarCurso(this.cursoSelecionado).subscribe({
      next: () => {
        Swal.fire('Sucesso', 'Curso atualizado com sucesso!', 'success');
        this.carregarCursos();
        this.showModalEditar = false;
      },
      error: () => {
        Swal.fire('Erro', 'Falha ao atualizar curso.', 'error');
      },
    });
  }

  deletarCurso(): void {
    this.cursoService.deletarCurso(this.cursoSelecionado.id).subscribe({
      next: () => {
        Swal.fire('Sucesso', 'Curso excluído com sucesso!', 'success');
        this.carregarCursos();
        this.showModalDeletar = false;
      },
      error: () => {
        Swal.fire('Erro', 'Falha ao excluir curso.', 'error');
      },
    });
  }

  receberPesquisa(termoPesquisa: string): void {
    this.isLoadingSearch = true;
    this.termoPesquisa = termoPesquisa || '';

    if (!termoPesquisa) {
      this.carregarCursos();
    } else {
      this.cursos = this.cursos.filter((curso) =>
        curso.nome.toLowerCase().includes(this.termoPesquisa.toLowerCase())
      );
      this.isLoadingSearch = false;
    }
  }

  private carregarCursos(): void {
    this.cursoService.listarCursos().subscribe({
      next: (cursos) => {
        this.cursos = cursos;
        this.isLoadingSearch = false;
      },
      error: () => {
        Swal.fire('Erro', 'Não foi possível carregar os cursos.', 'error');
        this.isLoadingSearch = false;
      },
    });
  }
}
