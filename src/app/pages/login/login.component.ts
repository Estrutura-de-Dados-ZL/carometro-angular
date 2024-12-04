import { Component, OnInit, signal } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent],
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
