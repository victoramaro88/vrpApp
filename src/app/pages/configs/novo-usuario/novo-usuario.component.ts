import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PerfilUsuarioModel } from 'src/app/models/perfil.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { HttpService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class NovoUsuarioComponent implements OnInit {
  objUsr: UsuarioModel = {idUsuario: 0, cpfUsuario:'', nomeUsuario:'', idPerfil: 0, statusUsuario: true, senhaUsuario: '', erroMensagem: ''};
  perfilSelecionado: PerfilUsuarioModel = {idPerfil: 0, descPerfil: '', statusPerfil: false};
  listaPerfil: PerfilUsuarioModel[] = [];
  boolLoading = false;
  msgs: any[] = [];
  senhaNaoConfere = false;
  mensagemSenha = '';
  senha = '';

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
        // console.log(response);
        if(response && response.length > 0) {
          this.listaPerfil = response;
          // this.perfilSelecionado = this.listaPerfil.find(item => item.idPerfil === this.objUsr.idPerfil) || {idPerfil: 0, descPerfil: '', statusPerfil: false};
          // this.BuscarUsuario('');
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

    CancelaNovoUsuario() {
      this.confirmationService.confirm({
        message: 'Deseja realmente cancelar a operação?',
        accept: () => {
          this.router.navigate(['/home/gerenciarUsuarios']);
        }
      });
    }

    Salvar() {
      this.objUsr.idPerfil = this.perfilSelecionado.idPerfil;
      this.objUsr.cpfUsuario = this.objUsr.cpfUsuario.replace('.', '').replace('.', '').replace('-', '');
      if(this.ValidaParametros()) {
        this.boolLoading = true;
        this.http.InserirUsuario(this.objUsr).subscribe(response => {
          // console.log(response);
          if(response && response === 'OK') {
            this.messageService.add({severity:'success', summary:'Sucesso', detail:'Usuário inserido com sucesso!'});
            setTimeout(() => {
              this.router.navigate(['/home/gerenciarUsuarios']);
            }, 2000);
          }
          else {
            this.messageService.add({severity:'error', summary:'Erro', detail:response.toString()});
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

    ValidaParametros() {
      if(this.objUsr.nomeUsuario.length > 2) {
        if(this.objUsr.cpfUsuario.length >= 11) {
          if(this.objUsr.idPerfil > 0) {
            if(!this.senhaNaoConfere && this.objUsr.senhaUsuario.length >= 8) {
              return true;
            } else {
              this.messageService.add({severity:'warn', summary:'Atenção', detail:'Digite uma senha válida.'});
              return false;
            }
          } else {
            this.messageService.add({severity:'warn', summary:'Atenção', detail:'Selecione o perfil do usuário.'});
            return false;
          }
        } else {
          this.messageService.add({severity:'warn', summary:'Atenção', detail:'Digite o cpf do usuário.'});
          return false;
        }
      } else {
        this.messageService.add({severity:'warn', summary:'Atenção', detail:'Digite o nome do usuário.'});
        return false;
      }
    }

}
