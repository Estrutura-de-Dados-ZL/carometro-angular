import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

type studentMock = {
  nome: string;
  foto: string;
  email: string;
};

@Component({
  selector: 'app-student-card',
  standalone: true,
  imports: [],
  templateUrl: './student-card.component.html',
  styleUrl: './student-card.component.css',
})
export class StudentCardComponent {
  @Input() student!: studentMock;

  constructor(private router: Router) {}

  goToStudentDetails(studentEmail: string) {
    const data = { studentEmail };
    this.router.navigate(['/alunoDetalhes'], { state: data });
  }
}
