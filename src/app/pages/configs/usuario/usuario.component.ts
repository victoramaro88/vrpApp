import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers: [MessageService],
})
export class UsuarioComponent implements OnInit {
  boolLoading = false;
  constructor() { }

  ngOnInit(): void {
  }

}
