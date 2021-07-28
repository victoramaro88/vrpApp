import { UsuarioModel } from './../../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpService } from 'src/app/services/http-service.service';
import { PerfilUsuarioModel } from 'src/app/models/perfil.model';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class UsuarioComponent implements OnInit {
  objUsr: UsuarioModel = {idUsuario: 0, cpfUsuario:'', nomeUsuario:'', idPerfil: 0, statusUsuario: false, senhaUsuario: '', erroMensagem: ''};
  listaPerfil: PerfilUsuarioModel[] = [];
  boolLoading = false;
  msgs: any[] = [];
  perfilSelecionado: PerfilUsuarioModel = {idPerfil: 0, descPerfil: '', statusPerfil: false};
  alterarSenha = false;
  senha = '';
  senhaNaoConfere = false;
  mensagemSenha = '';

  constructor(
    private http: HttpService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
    ) { }

  ngOnInit(): void {
    let sessionUser = sessionStorage.getItem('usr');
    this.objUsr = JSON.parse(sessionUser ? sessionUser : '');
    console.log(this.objUsr);

    this.ListarPerfil(0);
  }

  ListarPerfil(idPerfil: number) {
    this.boolLoading = true;
    this.http.ListarPerfil(idPerfil).subscribe(response => {
      if(response && response.length > 0) {
        this.listaPerfil = response;
        this.perfilSelecionado = this.listaPerfil.find(item => item.idPerfil === this.objUsr.idPerfil) || {idPerfil: 0, descPerfil: '', statusPerfil: false};
      }
      this.boolLoading = false;
    }, error => {
      this.msgs = [];
      console.log(error);
      if(error.status === 404) {
        this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao conectar com o servidor.'});
      } else {
        this.messageService.add({severity:'error', summary:'Erro', detail: error.message});
      }
      this.boolLoading = false;
    });
  }

  Salvar() {
    if(!this.senhaNaoConfere) {
      this.confirmationService.confirm({
        message: 'Deseja salvar as alterações realizadas?',
        accept: () => {
          console.log(this.objUsr);
        }
      });
    } else {
      this.messageService.add({severity:'warn', summary:'Erro', detail: this.mensagemSenha});
    }
  }

  ValidaSenhas() {
    if(this.senha.length < 8) {
      this.mensagemSenha = 'A senha deve ter mais de 8 caracteres!'
      this.senhaNaoConfere = true;
      return;
    }

    if(this.senha !== this.objUsr.senhaUsuario) {
      this.mensagemSenha = 'Senhas não conferem!'
      this.senhaNaoConfere = true;
    } else {
      this.senhaNaoConfere = false;
    }
  }

}
