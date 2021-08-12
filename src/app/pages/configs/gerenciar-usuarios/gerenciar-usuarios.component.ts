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
    this.boolLoading = true;
    this.http.ListarPerfil(idPerfil).subscribe(response => {
      console.log(response);
      if(response && response.length > 0) {
        this.listaPerfil = response;
        this.perfilSelecionado = this.listaPerfil.find(item => item.idPerfil === this.objUsr.idPerfil) || {idPerfil: 0, descPerfil: '', statusPerfil: false};
        this.BuscarUsuario('');
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

  BuscarUsuario(cpfUsr: string) {
    this.boolLoading = true;
    this.http.BuscarUsuario(cpfUsr).subscribe(response => {
      console.log(response)
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
    console.log(idUsuario);
  }

  AlteraStatusUsuario(idUsuario: number, statusUsuario: boolean) {
    this.boolLoading = true;
    this.http.AlteraStatusUsuario(idUsuario, statusUsuario).subscribe(response => {
      console.log(response)
      if(response === 'OK') {
        this.messageService.add({severity:'success', summary:'Sucesso', detail: 'Status alterado com sucesso!'});
        // this.listaUsuarios = response;
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
