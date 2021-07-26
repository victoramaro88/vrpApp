import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http-service.service';
import {MessageService} from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  cpf = '';
  senha = '';
  boolLoading = false;
  msgs: any[] = [];

  constructor(
    private router: Router,
    private http: HttpService,
    private messageService: MessageService
    ) { }

  ngOnInit(): void {
  }

  Login() {
    let cpfLogin = this.cpf.replace('.', '').replace('.', '').replace('-', '');

    this.boolLoading = true;
    this.http.validarLogin(cpfLogin, this.senha).subscribe(response => {
      console.log(response);
      if(response.idUsuario && response.idUsuario > 0) {
        this.router.navigate(['/home']);
      }
      else if(response.erroMensagem && response.erroMensagem.length > 0) {
        this.messageService.add({severity:'error', summary:'Erro', detail:response.erroMensagem});
      }
      this.boolLoading = false;
    }, error => {
      this.msgs = [];
      console.log(error);
      if(error.status === 0) {
        this.messageService.add({severity:'error', summary:'Erro', detail:'Falha ao conectar com o banco de dados, contate o administrador do sistema.'});
      } else {
        this.messageService.add({severity:'error', summary:'Erro', detail:error.message});
      }
      this.boolLoading = false;
    });
  }

}
