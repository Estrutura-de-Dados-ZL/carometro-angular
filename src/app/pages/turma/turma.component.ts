import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import Swal from 'sweetalert2';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TableComponent } from '../../components/table/table.component';
import { TurmaService } from '../../services/turma.service';
import { CursoService } from '../../services/curso.service';
import { ICurso } from '../../interfaces/curso';
import { ITurma, ITurmaId } from '../../interfaces/turma';

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
  styleUrls: ['./turma.component.css'],
})
export class TurmaComponent implements OnInit {
  colunas = ['cursoId', 'ano', 'semestre'];
  showModalEditar = false;
  showModalDeletar = false;
  showModalCadastrar = false;
  turmaSelecionada!: ITurma;
  turmas: ITurma[] = [];
  cursos: ICurso[] = [];
  isLoadingSearch = false;
  termoPesquisa = '';
  semestres = [
    { nome: '1º Semestre', id: '1' },
    { nome: '2º Semestre', id: '2' },
  ];

  semestreSelecionado = new FormControl('');
  cursoSelecionado = new FormControl('');
  turmaForm = new FormGroup({
    ano: new FormControl(''),
  });

  turmaCadastro = new FormGroup({
    ano: new FormControl(''),
    semestre: new FormControl(''),
    cursoId: new FormControl(''),
  });

  constructor(private turmaService: TurmaService, private cursoService: CursoService) {}

  ngOnInit(): void {
    this.carregarTurmas();
    this.carregarCursos();
  }

  carregarTurmas(): void {
    this.turmaService.listarTurmas().subscribe(
      (turmas) => {
        this.turmas = turmas;
        this.isLoadingSearch = false;
      },
      () => {
        this.isLoadingSearch = false;
        Swal.fire('Erro', 'Falha ao carregar as turmas.', 'error');
      }
    );
  }

  carregarCursos(): void {
    this.cursoService.listarCursos().subscribe(
      (cursos) => {
        this.cursos = cursos;
      },
      () => Swal.fire('Erro', 'Falha ao carregar os cursos.', 'error')
    );
  }

  abrirModalEditar(turma: ITurma): void {
    this.turmaSelecionada = { ...turma };
    this.turmaForm.patchValue({ ano: turma.turmaId.ano });
    this.semestreSelecionado.setValue(this.semestres.find((s) => s.id === turma.turmaId.semestre)?.id || null);
    this.cursoSelecionado.setValue(this.cursos.find((c) => c.id === turma.turmaId.cursoId)?.id?.toString() || null);
    this.showModalEditar = true;
  }

  abrirModalCadastrar(): void {
    this.turmaCadastro.reset()
    this.showModalCadastrar = true;
  }

  abrirModalDeletar(turma: ITurma): void {
    this.turmaSelecionada = turma;
    this.showModalDeletar = true;
  }

  cadastrarTurma(): void {
    const novaTurma: ITurma = {
      turmaId: {
        cursoId: Number(this.turmaCadastro.get('cursoId')?.value) || 0,
        ano: this.turmaCadastro.get('ano')?.value || '',
        semestre: this.turmaCadastro.get('semestre')?.value || '',
      },
      curso: this.cursos.find(
        (curso) => curso.id === Number(this.turmaCadastro.get('cursoId')?.value)
      )!,
    };

    this.turmaService.criarTurma(novaTurma).subscribe(
      () => {
        Swal.fire('Sucesso', 'Turma cadastrada com sucesso!', 'success');
        this.carregarTurmas();
        this.showModalCadastrar = false;
      },
      () => Swal.fire('Erro', 'Não foi possível cadastrar a turma.', 'error')
    );
  }

  editarTurma(): void {
    const turmaAtualizada: ITurma = {
      ...this.turmaSelecionada,
      turmaId: {
        ...this.turmaSelecionada.turmaId,
        ano: this.turmaForm.get('ano')?.value || '',
        semestre: this.semestreSelecionado.value || '',
        cursoId: Number(this.cursoSelecionado.value) || 0,
      },
      curso: this.cursos.find(curso => curso.id === Number(this.cursoSelecionado.value))!,
    };

    this.turmaService.atualizarTurma(turmaAtualizada).subscribe(
      () => {
        Swal.fire('Sucesso', 'Turma atualizada com sucesso!', 'success');
        this.carregarTurmas();
        this.showModalEditar = false;
      },
      () => Swal.fire('Erro', 'Não foi possível atualizar a turma.', 'error')
    );
  }

  deletarTurma(): void {
    const turmaId: ITurmaId = this.turmaSelecionada.turmaId;

    this.turmaService.deletarTurma(turmaId).subscribe(
      () => {
        Swal.fire('Sucesso', 'Turma deletada com sucesso!', 'success');
        this.carregarTurmas();
        this.showModalDeletar = false;
      },
      () => Swal.fire('Erro', 'Não foi possível deletar a turma.', 'error')
    );
  }

  receberPesquisa(termoPesquisa: string): void {
    this.isLoadingSearch = true;
    this.termoPesquisa = termoPesquisa.trim();

    if (!this.termoPesquisa) {
      this.carregarTurmas();
      return;
    }

    this.turmas = this.turmas.filter((turma) =>
      Object.values(turma.turmaId)
        .concat(turma.curso.nome)
        .some((valor) =>
          valor.toString().toLowerCase().includes(this.termoPesquisa.toLowerCase())
        )
    );
    this.isLoadingSearch = false;
  }
}
