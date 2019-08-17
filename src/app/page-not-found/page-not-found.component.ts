import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styles: []
})
export class PageNotFoundComponent implements OnInit {

  constructor(private router:Router, private authService: AuthService) { }

  ngOnInit() {
  }

  async dashboard() {
      this.router.navigate(['/dashboard']);
    }
  }


