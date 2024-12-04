import { Component, OnInit, signal } from '@angular/core';
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
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  emailFormControlSignIn = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControlSignIn = new FormControl('', [Validators.required, Validators.minLength(8)]);
  matcher = new MyErrorStateMatcher();
  hide = signal(true);
  hideSignIn = signal(true)
  isDisabled = true;
  isDisabledSignIn = true;

  highlightButtonLogIn(event: any){
    if (this.emailFormControl.valid && this.passwordFormControl.valid){
      this.isDisabled = false;
    }
  }
  highlightButtonSignIn(event: any){
    if (this.emailFormControl.valid && this.passwordFormControl.valid){
      this.isDisabledSignIn = false;
    }
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide())
    event.stopPropagation();
  }

  clickEventSignIn(event: MouseEvent) {
    this.hideSignIn.set(!this.hideSignIn())
    event.stopPropagation();
  }
}
