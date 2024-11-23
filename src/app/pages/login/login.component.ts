import { Component, signal } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatTooltip} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { MyErrorStateMatcher } from '../../helpers/EmailErrorStateMatcher';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, FormsModule, MatButtonModule, MatIconModule, MatTooltip],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();
  hide = signal(true);
  isDisabled = true;
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide())
    event.stopPropagation();
  }
}
