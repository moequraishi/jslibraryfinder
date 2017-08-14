import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
    providers: [AuthService]
})
export class LoginComponent {
    email: string;
    password: string;

  constructor(public authService: AuthService) { }

//    onLogin(form: NgForm) {
//        const email = form.value.email;
//        const password = form.value.password;
//        this.authService.loginUser(email, password);
//    }

    signup() {
        this.authService.signup(this.email, this.password);
        this.email = this.password = '';
    }

    login() {
        this.authService.login(this.email, this.password);
        this.email = this.password = '';
    }

    logout() {
        this.authService.logout();
    }

}
