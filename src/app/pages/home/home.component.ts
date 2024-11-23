import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { StudentCardComponent } from '../../components/student-card/student-card.component';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from '../../components/filters/filters.component';

const studentsMock = [
  {
    nome: 'John Doe',
    foto: 'https://i.pinimg.com/236x/19/bd/eb/19bdeb93ad73ce5ead4800d254c51008.jpg',
  },
  {
    nome: 'John Doe',
    foto: 'https://img.freepik.com/fotos-gratis/feche-o-retrato-de-um-rosto-jovem-barbudo_171337-2887.jpg?semt=ais_hybrid',
  },
  {
    nome: 'John Doe',
    foto: 'https://i.pinimg.com/236x/19/bd/eb/19bdeb93ad73ce5ead4800d254c51008.jpg',
  },
  {
    nome: 'John Doe',
    foto: 'https://img.freepik.com/fotos-gratis/feche-o-retrato-de-um-rosto-jovem-barbudo_171337-2887.jpg?semt=ais_hybrid',
  },
  {
    nome: 'John Doe',
    foto: 'https://i.pinimg.com/236x/19/bd/eb/19bdeb93ad73ce5ead4800d254c51008.jpg',
  },
  {
    nome: 'John Doe',
    foto: 'https://img.freepik.com/fotos-gratis/feche-o-retrato-de-um-rosto-jovem-barbudo_171337-2887.jpg?semt=ais_hybrid',
  },
  {
    nome: 'John Doe',
    foto: 'https://i.pinimg.com/236x/19/bd/eb/19bdeb93ad73ce5ead4800d254c51008.jpg',
  },
  {
    nome: 'John Doe',
    foto: 'https://img.freepik.com/fotos-gratis/feche-o-retrato-de-um-rosto-jovem-barbudo_171337-2887.jpg?semt=ais_hybrid',
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
}
