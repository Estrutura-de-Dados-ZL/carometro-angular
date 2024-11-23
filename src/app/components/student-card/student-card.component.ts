import { Component, Input } from '@angular/core';

type studentMock = {
  nome: string;
  foto: string;
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
}
