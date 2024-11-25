import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TableComponent } from '../../components/table/table.component';
import { Curso } from '../curso/curso.component';

const TURMA_CADASTRO = { cursoId: 0, ano: '', semestre: '' };

const turmasMock = [
  {
    cursoId: 1,
    ano: '2024',
    semestre: '1',
  },
  {
    cursoId: 2,
    ano: '2024',
    semestre: '1',
  },
  {
    cursoId: 3,
    ano: '2024',
    semestre: '2',
  },
];

interface Turma {
  cursoId: number;
  ano: string;
  semestre: string;
}

interface Semestre {
  nome: string;
  id: string;
}

@Component({
  selector: 'app-turma',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    DialogModule,
    FormsModule,
    NavbarComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './turma.component.html',
  styleUrl: './turma.component.css',
})
export class TurmaComponent implements OnInit {
  colunas = ['cursoId', 'ano', 'semestre'];

  showModalEditar = false;
  showModalDeletar = false;
  showModalCadastrar = false;
  turmaCadastro = TURMA_CADASTRO;
  turmaSelecionada!: Turma;
  turmas: Turma[] = [];
  isLoadingSearch = false;
  termoPesquisa = '';
  cursoSelecionado = new FormControl<Curso | undefined>(undefined);
  cursos = [
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
  semestres = [
    {
      nome: '1º Semestre',
      id: '1',
    },
    {
      nome: '2º Semestre',
      id: '2',
    },
  ];
  semestreSelecionado = new FormControl<Semestre | undefined>(undefined);

  constructor() {}

  ngOnInit(): void {
    this.carregarTurmas();
  }

  abrirModalEditar(turma: Turma): void {
    this.turmaSelecionada = { ...turma };
    this.setarValorInicialForm();
    this.showModalEditar = true;
  }

  abrirModalCadastrar(): void {
    this.showModalCadastrar = true;
  }

  abrirModalDeletar(turma: Turma): void {
    this.turmaSelecionada = turma;
    this.showModalDeletar = true;
  }

  cadastrarTurma(): void {
    if (
      this.turmaCadastro.cursoId &&
      this.turmaCadastro.ano &&
      this.turmaCadastro.semestre
    ) {
      // this.turmaService.create(this.turmaCadastro).subscribe(() => {
      // 	this.carregarTurmas();
      // });
      this.turmaCadastro = TURMA_CADASTRO;
      this.showModalCadastrar = false;
    }
  }

  editarTurma(): void {
    if (this.cursoSelecionado.value && this.semestreSelecionado.value) {
      this.turmaSelecionada.cursoId = this.cursoSelecionado.value.id;
      this.turmaSelecionada.semestre = this.semestreSelecionado.value.nome;
      console.log(this.turmaSelecionada);
      // this.turmaService.update(this.turmaSelecionada).subscribe(() => {
      //   this.carregarTurmas();
      //   this.showModalEditar = false;
      // });
    }
  }

  deletarTurma(): void {
    // this.turmaService.delete(this.turmaSelecionada.id).subscribe(() => {
    // 	this.carregarTurmas();
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

    this.filtrarTurmas();
  }

  filtrarTurmas(): void {
    if (this.termoPesquisa === 'colevati') {
      this.carregarTurmas();
      return;
    }

    // this.turmaService.getByNome(this.termoPesquisa).subscribe(clientes => {
    // 	if (clientes.length > 0) {
    // 		this.turmas = clientes;
    // 	}

    // 	this.isLoadingSearch = false;
    // });
  }

  private setarValorInicialForm(): void {
    // TODO setar valores iniciais dos selects
    this.cursoSelecionado.setValue(
      this.buscarCurso(this.turmaSelecionada.cursoId)
    );

    this.semestreSelecionado.setValue(
      this.buscarSemestre(this.turmaSelecionada.semestre)
    );
  }

  private buscarCurso(cursoId: number): Curso | undefined {
    return this.cursos.find((c) => c.id === cursoId);
  }

  private buscarSemestre(semestreId: string): Semestre | undefined {
    return this.semestres.find((s) => s.id === semestreId);
  }

  private carregarTurmas(): void {
    this.turmas = turmasMock;
    // this.turmaService.getAll().subscribe(turmas => {
    // 	if (turmas.length > 0) {
    // 		this.turmas = turmas;
    // 	}
    // 	this.isLoadingSearch = false;
    // });
  }
}
