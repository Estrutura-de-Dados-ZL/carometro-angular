import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

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

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent {
  cursos = cursosMock;
}
