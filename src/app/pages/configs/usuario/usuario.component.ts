import { UsuarioModel } from './../../../models/usuario.model';
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
  objUsr: UsuarioModel = {idUsuario: 0, cpfUsuario:'', nomeUsuario:'', idPerfil: 0, statusUsuario: false, senhaUsuario: '', erroMensagem: ''};

  ngOnInit(): void {
    console.log(sessionStorage.getItem('usr'));
  }

}
