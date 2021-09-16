import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HistoricoPCModel } from 'src/app/models/historicoPC.model';
import { ParamListaHistoricoPCModel } from 'src/app/models/paramHistPC.model';
import { PontoCriticoModel } from 'src/app/models/pontoCritico.model';
import { HttpService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-historico-pc',
  templateUrl: './historico-pc.component.html',
  styleUrls: ['./historico-pc.component.css'],
  providers: [MessageService],
})
export class HistoricoPCComponent implements OnInit {
  boolLoading = false;
  boolVisualizarHistorico = false;
  msgs: any[] = [];
  listaPC: PontoCriticoModel[] = [];
  listaHistoricoPC: HistoricoPCModel[] = [];
  dataInicial: any;
  dataFinal: any;
  idPC = 0;
  statusVazaoPCSelecionado = false;

  constructor(
    private http: HttpService,
    private messageService: MessageService
    ) { }

  ngOnInit(): void {
    this.ListarPC(0);
  }

  ListarPC(idPC: number) {
    this.boolLoading = true;
    this.http.ListarPC(idPC).subscribe(response => {
      this.listaPC = response;
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

  ListaHistoricoPC(parametrosPC: ParamListaHistoricoPCModel) {
    this.boolLoading = true;
    this.listaHistoricoPC = [];
    this.http.ListaHistoricoPC(parametrosPC).subscribe(response => {
      // console.log(response);
      if(response && response.length > 0 && response.toString() != 'Sem informações de retorno.') {
        this.listaHistoricoPC = response;
      } else if(response.toString() === 'Sem informações de retorno.') {
        this.messageService.add({severity:'warn', summary:'Atenção', detail: response.toString()});
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

  VisualizarHistoricoPC(idPC: number) {
    this.boolVisualizarHistorico = true;
    this.idPC = idPC;
    let objPC = this.listaPC.find(p => p.idPC === idPC);
    this.statusVazaoPCSelecionado = objPC ? objPC.statusVazao : false;
    let parametrosPC: ParamListaHistoricoPCModel = { idPC: 0, dataInicial: undefined, dataFinal: undefined, linhas: 0 };
    parametrosPC.idPC = idPC;
    parametrosPC.linhas = 100;
    this.ListaHistoricoPC(parametrosPC);
  }

  FiltrarPorData() {
    if(this.dataInicial && this.dataFinal &&  this.dataInicial <= this.dataFinal) {
      let parametrosPC: ParamListaHistoricoPCModel = { idPC: 0, dataInicial: undefined, dataFinal: undefined, linhas: 0 };
      parametrosPC.idPC = this.idPC;
      parametrosPC.linhas = 100;
      parametrosPC.dataInicial = this.dataInicial;
      parametrosPC.dataFinal = this.dataFinal;
      this.ListaHistoricoPC(parametrosPC);
    } else {
      this.messageService.add({severity:'warn', summary:'Atenção', detail: 'A data final deve ser maior que a data inicial.'});
    }
  }

  Voltar() {
    this.boolVisualizarHistorico = false;
  }

  AtualizarHistorico() {
    let parametrosPC: ParamListaHistoricoPCModel = { idPC: 0, dataInicial: undefined, dataFinal: undefined, linhas: 0 };
    parametrosPC.idPC = this.idPC;
    parametrosPC.linhas = 100;
    this.ListaHistoricoPC(parametrosPC);
  }

}
