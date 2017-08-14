import { Component, OnInit } from '@angular/core';
import { AppRoutesModule } from '../app.routes';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
    providers: [AuthService]
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }
    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

}
