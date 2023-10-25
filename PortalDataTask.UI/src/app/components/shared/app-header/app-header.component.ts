import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  username: string = '';

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.username = window.localStorage.getItem('az-name')!
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
