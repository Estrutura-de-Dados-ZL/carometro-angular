import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { StudentCardComponent } from '../../components/student-card/student-card.component';
import { CommonModule } from '@angular/common';
import {
  FiltersComponent,
  IFilter,
} from '../../components/filters/filters.component';

const studentsMock = [
  {
    nome: 'John Doe',
    foto: 'https://i.pinimg.com/236x/19/bd/eb/19bdeb93ad73ce5ead4800d254c51008.jpg',
    email: 'test1@test.com',
  },
  {
    nome: 'John Doe',
    foto: 'https://img.freepik.com/fotos-gratis/feche-o-retrato-de-um-rosto-jovem-barbudo_171337-2887.jpg?semt=ais_hybrid',
    email: 'test2@test.com',
  },
  {
    nome: 'John Doe',
    foto: 'https://i.pinimg.com/236x/19/bd/eb/19bdeb93ad73ce5ead4800d254c51008.jpg',
    email: 'test3@test.com',
  },
  {
    nome: 'John Doe',
    foto: 'https://img.freepik.com/fotos-gratis/feche-o-retrato-de-um-rosto-jovem-barbudo_171337-2887.jpg?semt=ais_hybrid',
    email: 'test4@test.com',
  },
  {
    nome: 'John Doe',
    foto: 'https://i.pinimg.com/236x/19/bd/eb/19bdeb93ad73ce5ead4800d254c51008.jpg',
    email: 'test5@test.com',
  },
  {
    nome: 'John Doe',
    foto: 'https://img.freepik.com/fotos-gratis/feche-o-retrato-de-um-rosto-jovem-barbudo_171337-2887.jpg?semt=ais_hybrid',
    email: 'test@test.com',
  },
  {
    nome: 'John Doe',
    foto: 'https://i.pinimg.com/236x/19/bd/eb/19bdeb93ad73ce5ead4800d254c51008.jpg',
    email: 'test@test.com',
  },
  {
    nome: 'John Doe',
    foto: 'https://img.freepik.com/fotos-gratis/feche-o-retrato-de-um-rosto-jovem-barbudo_171337-2887.jpg?semt=ais_hybrid',
    email: 'test@test.com',
  },
];

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
  styleUrl: './home.component.css',
})
export class HomeComponent {
  students = studentsMock;
  filtersVisible: boolean = false;

  toggleFilters(): void {
    this.filtersVisible = !this.filtersVisible;
  }

  filtrar(filtros: IFilter) {
    console.log(filtros);
  }

  getAllAlunos() {
    console.log('aaaaa');
  }
}
