import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PontoCriticoModel } from 'src/app/models/pontoCritico.model';
import { HttpService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-gerenciarpc',
  templateUrl: './gerenciarpc.component.html',
  styleUrls: ['./gerenciarpc.component.css'],
  providers: [MessageService],
})
export class GerenciarpcComponent implements OnInit {
  boolLoading = false;
  boolEditarParametros = false;
  msgs: any[] = [];
  listaPC: PontoCriticoModel[] = [];
  idPC = 0;

  pressaoInvalida = false;
  horaInInvalida = false;
  horaFiInvalida = false;

  constructor(
    private http: HttpService,
    private messageService: MessageService,
    private router: Router,
    ) { }


  ngOnInit(): void {
    this.ListarPC(0);
  }

  ListarPC(idPC: number) {
    this.boolLoading = true;
    this.http.ListarPC(idPC).subscribe(response => {
      // console.log(response);
      if(response && response.length > 0) {
        this.listaPC = response;
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

  EditarVRP(idPC: number) {
    this.router.navigate(['/home/cadastroPC'], { queryParams: { idPC: idPC } });
  }

}
