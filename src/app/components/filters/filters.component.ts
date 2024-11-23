import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

const cursosMock = [
  {
    nome: 'Analise e Desenvolvimento de Sistemas',
    value: 1,
  },
  {
    nome: 'Comex',
    value: 1,
  },
  {
    nome: 'Polimeros',
    value: 1,
  },
];

interface IFilter {
  ano: number;
  semestre: number;
  curso: number;
  aluno: string;
}

interface ISemestre {
  nome: string;
  id: number;
}

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent {
  @Output() filtroEnviado = new EventEmitter<IFilter>();

  cursos = cursosMock;
  selectedCurso: number = 0;
  aluno: string = '';
  ano!: number | null;
  selectedSemestre: number = 0;
  showSemestre: boolean = false;
  semestres: ISemestre[] = [
    {
      nome: '1º Semestre',
      id: 1,
    },
    {
      nome: '2º Semestre',
      id: 2,
    },
  ];

  onAnoChange() {
    if (this.ano !== null) {
      if (this.ano > 999) {
        this.showSemestre = true;
      }

      if (this.ano < 1000) {
        this.showSemestre = false;
      }
    }
  }

  onSemestreChange(event: MatSelectChange) {
    this.selectedSemestre = event.value;
  }

  onCursoChange(event: MatSelectChange) {
    this.selectedCurso = event.value;
  }

  filtrar() {
    console.log(
      this.ano,
      this.aluno,
      this.selectedSemestre,
      this.selectedCurso
    );
  }

  limparFiltros() {
    this.ano = null;
    this.aluno = '';
    this.selectedSemestre = 0;
    this.selectedCurso = 0;
    this.showSemestre = false;
  }
}
