import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { CursoService } from '../../services/curso.service';
import { ICurso } from '../../interfaces/curso'; 

export interface IFilter {
  ano?: number;
  semestre?: number;
  curso?: number;
  nome?: string;
}

export interface ISemestre {
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

export class FiltersComponent implements OnInit {
  @Output() enviarFiltro = new EventEmitter<IFilter>();
  @Output() limparFiltro = new EventEmitter<null>();

  cursos: ICurso[] = []; // Initialize an empty array for courses
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

  constructor(private cursoService: CursoService) { }

  ngOnInit(): void {
    this.loadCursos(); // Call loadCursos when the component initializes
  }

  // Method to load courses from the service
  loadCursos(): void {
    this.cursoService.listarCursos().subscribe(
      (cursos) => {
        this.cursos = cursos; // Assign fetched courses to the cursos array
      },
      (error) => {
        console.error('Error loading courses', error);
      }
    );
  }

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
    const filtro : IFilter = {};
    if(this.ano){
      filtro.ano = this.ano; 
    }
    if (this.selectedSemestre) {
      filtro.semestre = this.selectedSemestre;
    }
    if(this.selectedCurso) {
      filtro.curso = this.selectedCurso;
    }
    if(this.aluno) {
      filtro.nome = this.aluno;
    }
    this.enviarFiltro.emit(filtro);
  }

  limparFiltros() {
    this.ano = null;
    this.aluno = '';
    this.selectedSemestre = 0;
    this.selectedCurso = 0;
    this.showSemestre = false;

    this.limparFiltro.emit();
  }
}