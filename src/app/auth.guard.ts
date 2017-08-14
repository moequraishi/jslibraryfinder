import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {
    user: Observable<firebase.User>;
  constructor(private auth: AuthService, private router: Router, private firebaseAuth: AngularFireAuth) {
      this.user = firebaseAuth.authState;
  }
// Save the Logged in state, and only allow users to see other routes if logged in
    canActivate(): Observable<boolean> {
        return this.user
        .take(1)
        .map(authState => !!authState)
        .do(auth => !auth ? this.router.navigate(['/login']) : true);
    }
}
