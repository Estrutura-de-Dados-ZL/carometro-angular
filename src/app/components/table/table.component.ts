import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputSearchComponent } from '../input-search/input-search.component';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [InputSearchComponent, TableModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input() colunas: string[] = [];
  @Input() data: any[] = [];
  @Input() isHistorico = false;
  @Input() isLoadingSearch = false;
  @Output() pesquisaEnviada = new EventEmitter<string>();
  @Output() dataAdd = new EventEmitter<any>();
  @Output() dataEdit = new EventEmitter<any>();
  @Output() dataDelete = new EventEmitter<any>();
  @Output() dataView = new EventEmitter<any>();
  @Output() termoPesquisa = new EventEmitter<string>();

  editar(data: any) {
    this.dataEdit.emit(data);
  }

  deletar(data: any) {
    this.dataDelete.emit(data);
  }

  adicionar() {
    this.dataAdd.emit(true);
  }

  visualizar(data: any) {
    this.dataView.emit(data);
  }

  pesquisar(termo: string) {
    this.termoPesquisa.emit(termo);
  }

  enviarPesquisa(termo: string) {
    this.pesquisaEnviada.emit(termo);
  }
}
