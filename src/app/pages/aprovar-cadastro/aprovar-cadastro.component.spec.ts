import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprovarCadastroComponent } from './aprovar-cadastro.component';

describe('AprovarCadastroComponent', () => {
  let component: AprovarCadastroComponent;
  let fixture: ComponentFixture<AprovarCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AprovarCadastroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AprovarCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
