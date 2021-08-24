import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    // this.router.navigate(['/home/dashboard']);
    // this.router.navigate(['/home/parametrosVRP']);
    // this.router.navigate(['/home/gerenciarUsuarios']);
    this.router.navigate(['/home/novoUsuario']);
  }

}
