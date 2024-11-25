import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TableComponent } from '../../components/table/table.component';
import { StudentDetailsComponent } from '../student-details/student-details.component';
import { IAlunoDetails } from '../../interfaces/aluno-details';

@Component({
  selector: 'app-aprovar-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    DialogModule,
    FormsModule,
    NavbarComponent,
  ],
  templateUrl: './aprovar-cadastro.component.html',
  styleUrl: './aprovar-cadastro.component.css',
})
export class AprovarCadastroComponent implements OnInit {
  colunas = ['nome'];
  alunoSelecionado: IAlunoDetails | undefined;
  totalProdutosNoCarrinho = '0';
  displayModal = false;
  alunos: IAlunoDetails[] = [
    {
      nome: 'João Silva',
      email: 'test@test.com',
      foto: 'https://i.pinimg.com/236x/19/bd/eb/19bdeb93ad73ce5ead4800d254c51008.jpg',
      link: 'https://www.linkedin.com/in/joao-silva',
      comentario: 'Aluno dedicado e com grande potencial em tecnologia.',
      campoLivre:
        'João tem se destacado em projetos de software e também como mentor em hackathons.',
      curso: 'Ciência da Computação',
      experiencias: [
        {
          nome: 'Estágio de Desenvolvimento Web',
          funcao: 'Desenvolvedor Frontend',
          inicio: 'Jan 2023',
          fim: 'Dez 2023',
        },
        {
          nome: 'Projeto de Pesquisa em Inteligência Artificial',
          funcao: 'Pesquisador',
          inicio: 'Mar 2022',
          fim: 'Nov 2022',
        },
      ],
    },
    {
      nome: 'Maria Oliveira',
      email: 'test@test.com',
      foto: 'https://i.pinimg.com/236x/ab/56/89/ab5689a8e56d8e8c2cf3679988b3fc88.jpg',
      link: 'https://www.linkedin.com/in/maria-oliveira',
      comentario:
        'Entusiasta em desenvolvimento de software com experiência em metodologias ágeis.',
      campoLivre:
        'Maria tem contribuído em comunidades de tecnologia e liderado grupos de estudos.',
      curso: 'Engenharia de Software',
      experiencias: [
        {
          nome: 'Desenvolvimento de Aplicativos Móveis',
          funcao: 'Desenvolvedora Mobile',
          inicio: 'Fev 2023',
          fim: 'Ago 2023',
        },
        {
          nome: 'Projeto Open Source',
          funcao: 'Contribuidora',
          inicio: 'Set 2022',
          fim: 'Jan 2023',
        },
      ],
    },
    {
      nome: 'Carlos Pereira',
      email: 'test@test.com',
      foto: 'https://i.pinimg.com/236x/23/45/67/2345678cb39b25678912345a12345678.jpg',
      link: 'https://www.linkedin.com/in/carlos-pereira',
      comentario:
        'Especialista em análise de dados e apaixonado por aprendizado de máquina.',
      campoLivre:
        'Carlos publicou artigos em conferências e trabalha como voluntário em ONGs de tecnologia.',
      curso: 'Engenharia da Computação',
      experiencias: [
        {
          nome: 'Analista de Dados em Startup',
          funcao: 'Analista de Dados',
          inicio: 'Jan 2022',
          fim: 'Jul 2023',
        },
        {
          nome: 'Estágio em Visão Computacional',
          funcao: 'Pesquisador',
          inicio: 'Ago 2021',
          fim: 'Dez 2021',
        },
      ],
    },
    {
      nome: 'Ana Souza',
      email: 'test@test.com',
      foto: 'https://i.pinimg.com/236x/34/56/78/34567890abcd345678909876.jpg',
      link: 'https://www.linkedin.com/in/ana-souza',
      comentario: 'Aluna proativa com experiência em projetos internacionais.',
      campoLivre:
        'Ana liderou equipes multiculturais em projetos de tecnologia sustentável.',
      curso: 'Sistemas de Informação',
      experiencias: [
        {
          nome: 'Projeto de Internacionalização de Produtos',
          funcao: 'Coordenadora de TI',
          inicio: 'Mar 2023',
          fim: 'Set 2023',
        },
        {
          nome: 'Hackathon Universitário',
          funcao: 'Mentora',
          inicio: 'Out 2022',
          fim: 'Nov 2022',
        },
      ],
    },
    {
      nome: 'Pedro Santos',
      email: 'test@test.com',
      foto: 'https://i.pinimg.com/236x/45/67/89/456789abcd4567891234efgh.jpg',
      link: 'https://www.linkedin.com/in/pedro-santos',
      comentario: 'Focado em soluções cloud e automação de infraestrutura.',
      campoLivre:
        'Pedro implementou pipelines DevOps em empresas de médio porte.',
      curso: 'Tecnologia em Redes de Computadores',
      experiencias: [
        {
          nome: 'Administrador de Sistemas',
          funcao: 'DevOps Engineer',
          inicio: 'Jun 2023',
          fim: 'Atual',
        },
        {
          nome: 'Consultoria em Infraestrutura',
          funcao: 'Consultor',
          inicio: 'Abr 2022',
          fim: 'Dez 2022',
        },
      ],
    },
  ];

  constructor() {}

  ngOnInit(): void {
    this.carregarAlunos();
    const totalProdutosNoCarrinho = localStorage.getItem(
      'totalProdutosCarrinho'
    );
    if (totalProdutosNoCarrinho) {
      this.totalProdutosNoCarrinho = totalProdutosNoCarrinho;
    }
  }

  abrirModal(aluno: IAlunoDetails): void {
    if (aluno.email && this.alunos.length > 0) {
      this.alunoSelecionado = this.alunos.find((c) => c.email === aluno.email);
      this.displayModal = true;
    }
  }

  recusarCadastro() {}

  aceitarCadastro() {}

  private carregarAlunos(): void {
    // this.alunoService.getAll().subscribe(aluno => {
    // 	if (aluno.length > 0) {
    // 		this.aluno = aluno;
    // 		this.aluno = aluno.map(aluno => new Aluno(aluno));
    // 	}
    // });
  }
}
