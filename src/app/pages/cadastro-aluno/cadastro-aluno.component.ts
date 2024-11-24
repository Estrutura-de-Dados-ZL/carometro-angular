import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AlunoService } from '../../services/aluno.service';
import { IAluno } from '../../interfaces/aluno';
import { ITurma } from '../../interfaces/turma';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import Swal from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-cadastro-aluno',
  templateUrl: './cadastro-aluno.component.html',
  styleUrls: ['./cadastro-aluno.component.css'],
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, HttpClientModule],
})
export class CadastroAlunoComponent implements OnInit {
  cadastroAlunoForm = new FormGroup({
    foto: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required),
    comentario: new FormControl('', Validators.required),
    campoLivre: new FormControl('', Validators.required),
    permissaoDados: new FormControl(false, Validators.requiredTrue),
    pendente: new FormControl(false, Validators.required),
    turma: new FormControl<ITurma | null>(null, Validators.required),
    experiencias: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}

  constructor(
    private alunoService: AlunoService,
    private router: Router,
    private httpClient: HttpClientModule
  ) {}

  cadastrarAluno(): void {
    if (this.cadastroAlunoForm.valid) {
      const aluno: IAluno = {
        foto: this.cadastroAlunoForm.get('foto')?.value || '',
        link: this.cadastroAlunoForm.get('link')?.value || '',
        comentario: this.cadastroAlunoForm.get('comentario')?.value || '',
        campoLivre: this.cadastroAlunoForm.get('campoLivre')?.value || '',
        permissaoDados:
          this.cadastroAlunoForm.get('permissaoDados')?.value || false,
        pendente: this.cadastroAlunoForm.get('pendente')?.value || false,
        turma: this.cadastroAlunoForm.get('turma')?.value as ITurma,
        experiencias: JSON.parse(
          this.cadastroAlunoForm.get('experiencias')?.value || '[]'
        ),
      };

      this.alunoService.criarAluno(aluno).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Aluno cadastrado com sucesso!',
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigate(['/alunos']);
        },
        (error) => {
          console.error('Erro ao cadastrar aluno:', error);
          Swal.fire({
            icon: 'error',
            title: 'Erro ao cadastrar aluno',
            text: 'Tente novamente mais tarde.',
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Preencha todos os campos corretamente',
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/alunos']);
  }
}
