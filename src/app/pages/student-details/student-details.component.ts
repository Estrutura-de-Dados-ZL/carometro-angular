import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAlunoDetails } from '../../interfaces/aluno-details';
import { AlunoService } from '../../services/aluno.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
})
export class StudentDetailsComponent implements OnInit {
  studentEmail!: string;
  aluno!: IAlunoDetails | null;

  constructor(private router: Router, private alunoService: AlunoService) {
    const navigation = this.router.getCurrentNavigation();
    this.studentEmail = navigation?.extras.state?.['studentEmail'] ?? '';

    if (!this.studentEmail) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loadAluno();
  }

  loadAluno(): void {
    this.alunoService.buscarAlunoPorEmail(this.studentEmail).subscribe(
      (aluno) => {
        this.aluno = aluno;
      },
      (error) => {
        this.aluno = null;
        this.showErrorAlert('Erro ao carregar os detalhes do aluno.');
        console.error('Erro:', error);
      }
    );
  }

  showErrorAlert(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
      confirmButtonText: 'Ok',
    });
  }

  showExperienciasAlert(): void {
    Swal.fire({
      title: 'Experiências do Aluno',
      html: this.generateExperienciasHtml(),
      icon: 'info',
      confirmButtonText: 'Fechar',
    });
  }

  private generateExperienciasHtml(): string {
    if (!this.aluno || this.aluno.experiencias.length === 0) {
      return '<p>O aluno não possui experiências cadastradas.</p>';
    }

    return this.aluno.experiencias
      .map(
        (exp) =>
          `<p><strong>${exp.nome}</strong><br>Função: ${exp.funcao}<br>Período: ${exp.inicio} - ${exp.fim}</p>`
      )
      .join('<hr>');
  }
}
