import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';

const CURSO_CADASTRO = { id: 0, nome: '' };

export interface Curso {
  id: number;
  nome: string;
}

const cursoMock = [
  {
    id: 1,
    nome: 'ads',
  },
  {
    id: 2,
    nome: 'comex',
  },
  {
    id: 3,
    nome: 'polimero',
  },
  {
    id: 4,
    nome: 'gestao',
  },
];

@Component({
  selector: 'app-curso',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    DialogModule,
    FormsModule,
    NavbarComponent,
  ],
  templateUrl: './curso.component.html',
  styleUrl: './curso.component.css',
})
export class CursoComponent implements OnInit {
  colunas = ['id', 'nome'];

  showModalEditar = false;
  showModalDeletar = false;
  showModalCadastrar = false;
  cursoCadastro = CURSO_CADASTRO;
  cursoSelecionado!: Curso;
  cursos: Curso[] = [];
  isLoadingSearch = false;
  termoPesquisa = '';

  constructor() {}

  ngOnInit(): void {
    this.carregarCursos();
  }

  abrirModalEditar(curso: Curso): void {
    this.cursoSelecionado = { ...curso };
    this.showModalEditar = true;
  }

  abrirModalCadastrar(): void {
    this.showModalCadastrar = true;
  }

  abrirModalDeletar(curso: Curso): void {
    this.cursoSelecionado = curso;
    this.showModalDeletar = true;
  }

  cadastrarCurso(): void {
    if (this.cursoCadastro.nome) {
      // this.cursoService.create(this.cursoCadastro).subscribe(() => {
      // 	this.carregarCursos();
      // });
      this.cursoCadastro = CURSO_CADASTRO;
      this.showModalCadastrar = false;
    }
  }

  editarCurso(): void {
    console.log(this.cursoSelecionado);

    // this.cursoService.update(this.cursoSelecionado).subscribe(() => {
    //   this.carregarCursos();
    //   this.showModalEditar = false;
    // });
  }

  deletarCurso(): void {
    // this.cursoService.delete(this.cursoSelecionado.id).subscribe(() => {
    // 	this.carregarCursos();
    // 	this.showModalDeletar = false;
    // });
  }

  receberPesquisa(termoPesquisa: string) {
    this.isLoadingSearch = true;
    if (termoPesquisa === '') {
      this.termoPesquisa = 'colevati';
    } else {
      this.termoPesquisa = termoPesquisa;
    }

    this.filtrarCursos();
  }

  filtrarCursos(): void {
    if (this.termoPesquisa === 'colevati') {
      this.carregarCursos();
      return;
    }

    // this.cursoService.getByNome(this.termoPesquisa).subscribe(clientes => {
    // 	if (clientes.length > 0) {
    // 		this.cursos = clientes;
    // 	}

    // 	this.isLoadingSearch = false;
    // });
  }

  private carregarCursos(): void {
    this.cursos = cursoMock;
    // this.cursoService.getAll().subscribe(cursos => {
    // 	if (cursos.length > 0) {
    // 		this.cursos = cursos;
    // 	}
    // 	this.isLoadingSearch = false;
    // });
  }
}
