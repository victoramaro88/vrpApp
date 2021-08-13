import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PerfilUsuarioModel } from 'src/app/models/perfil.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { HttpService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-gerenciar-usuarios',
  templateUrl: './gerenciar-usuarios.component.html',
  styleUrls: ['./gerenciar-usuarios.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class GerenciarUsuariosComponent implements OnInit {
  objUsr: UsuarioModel = {idUsuario: 0, cpfUsuario:'', nomeUsuario:'', idPerfil: 0, statusUsuario: false, senhaUsuario: '', erroMensagem: ''};
  listaPerfil: PerfilUsuarioModel[] = [];
  listaUsuarios: UsuarioModel[] = [];
  boolLoading = false;
  msgs: any[] = [];
  perfilSelecionado: PerfilUsuarioModel = {idPerfil: 0, descPerfil: '', statusPerfil: false};
  alterarSenha = false;
  senha = '';
  senhaNaoConfere = false;
  editarUsuario = false;
  mensagemSenha = '';

  constructor(
    private http: HttpService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.ListarPerfil(0);
  }

  ListarPerfil(idPerfil: number) {
    this.editarUsuario = false;
    this.boolLoading = true;
    this.http.ListarPerfil(idPerfil).subscribe(response => {
      // console.log(response);
      if(response && response.length > 0) {
        this.listaPerfil = response;
        this.perfilSelecionado = this.listaPerfil.find(item => item.idPerfil === this.objUsr.idPerfil) || {idPerfil: 0, descPerfil: '', statusPerfil: false};
        this.BuscarUsuario('');
      }
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

  BuscarUsuario(cpfUsr: string) {
    this.http.BuscarUsuario(cpfUsr).subscribe(response => {
      // console.log(response)
      if(response.length > 0) {
        this.listaUsuarios = response;
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

  SelecionarUsuario(idUsuario: number) {
    this.editarUsuario = true;
    let indice = this.listaUsuarios.findIndex(u => u.idUsuario === idUsuario);
    this.objUsr = this.listaUsuarios[indice];
    this.perfilSelecionado = this.listaPerfil.find(item => item.idPerfil === this.objUsr.idPerfil) || {idPerfil: 0, descPerfil: '', statusPerfil: false};
  }

  CancelaAlterarUsuario() {
    this.editarUsuario = false;
  }

  AlteraStatusUsuario(idUsuario: number, statusUsuario: boolean) {
    this.boolLoading = true;
    this.http.AlteraStatusUsuario(idUsuario, statusUsuario).subscribe(response => {
      if(response === 'OK') {
        this.messageService.add({severity:'success', summary:'Sucesso', detail: 'Status alterado com sucesso!'});
        for (const item of this.listaUsuarios) {
          if(item.idUsuario === idUsuario) {
            item.statusUsuario = statusUsuario;
          }
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

  Salvar() {
    this.objUsr.idPerfil = this.perfilSelecionado.idPerfil;
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
            this.ListarPerfil(0);
          }, 2000);
        } else {
          this.messageService.add({severity:'error', summary:'Erro', detail: response});
        }
      }
      // this.boolLoading = false;
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

}
