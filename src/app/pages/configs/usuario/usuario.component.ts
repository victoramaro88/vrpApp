import { UsuarioModel } from './../../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpService } from 'src/app/services/http-service.service';
import { PerfilUsuarioModel } from 'src/app/models/perfil.model';
import {ConfirmationService} from 'primeng/api';
import { Router } from '@angular/router';

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
    private confirmationService: ConfirmationService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    let sessionUser = sessionStorage.getItem('usr');
    this.objUsr = JSON.parse(sessionUser ? sessionUser : '');

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
          this.ManterUsuario(this.objUsr);
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

  CancelaAlterarSenha() {
    this.alterarSenha=false;
    this.senhaNaoConfere=false;
    this.senha = '';
    this.objUsr.senhaUsuario = '';
  }

  ManterUsuario(objUsuario: UsuarioModel) {
    this.boolLoading = true;
    this.http.ManterUsuario(objUsuario).subscribe(response => {
      if(response) {
        if(response === "OK") {
          this.messageService.add({severity:'success', summary:'Sucesso', detail: 'Usuário alterado com sucesso!'});
          sessionStorage.setItem('usr', JSON.stringify(objUsuario));
          let sessionUser = sessionStorage.getItem('usr');
          this.objUsr = JSON.parse(sessionUser ? sessionUser : '');
          setTimeout(() => {
            this.router.navigate(['/home/dashboard']);
          }, 2000);
        } else {
          this.messageService.add({severity:'error', summary:'Erro', detail: response});
        }
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

}
