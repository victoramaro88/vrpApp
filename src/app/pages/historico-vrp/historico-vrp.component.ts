import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HistoricoVRPModel } from 'src/app/models/historicoVRP.model';
import { ParamListaHistoricoModel } from 'src/app/models/paramListaHistorico.model';
import { VRPModel } from 'src/app/models/vrp.model';
import { HttpService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-historico-vrp',
  templateUrl: './historico-vrp.component.html',
  styleUrls: ['./historico-vrp.component.css'],
  providers: [MessageService],
})
export class HistoricoVRPComponent implements OnInit {
  boolLoading = false;
  boolVisualizarHistorico = false;
  msgs: any[] = [];
  listaVRP: VRPModel[] = [];
  listaHistorico: HistoricoVRPModel[] = [];
  // dataInicial: Date = new Date;
  // dataFinal: Date = new Date;
  dataInicial: any;
  dataFinal: any;
  idVRP = 0;

  constructor(
    private http: HttpService,
    private messageService: MessageService
    ) { }

  ngOnInit(): void {
    this.ListarVRP(0);
  }

  ListarVRP(idVRP: number) {
    this.boolLoading = true;
    this.http.ListarVRP(idVRP).subscribe(response => {
      // console.log(response);
      if(response && response.length > 0) {
        this.listaVRP = response;
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

  ListarHistoricoVRP(parametrosVRP: ParamListaHistoricoModel) {
    this.boolLoading = true;
    this.listaHistorico = [];
    this.http.ListarHistoricoVRP(parametrosVRP).subscribe(response => {
      // console.log(response);
      if(response && response.length > 0 && response.toString() != 'Sem informações de retorno.') {
        this.listaHistorico = response;
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

  VisualizarHistorico(idVRP: number) {
    this.boolVisualizarHistorico = true;
    this.idVRP = idVRP;
    let parametrosVRP: ParamListaHistoricoModel = { idVRP: 0, dataInicial: undefined, dataFinal: undefined, linhas: 0 };
    parametrosVRP.idVRP = idVRP;
    parametrosVRP.linhas = 100;
    this.ListarHistoricoVRP(parametrosVRP);
  }

  FiltrarPorData() {
    if(this.dataInicial && this.dataFinal &&  this.dataInicial <= this.dataFinal) {
      let parametrosVRP: ParamListaHistoricoModel = { idVRP: 0, dataInicial: undefined, dataFinal: undefined, linhas: 0 };
      parametrosVRP.idVRP = this.idVRP;
      parametrosVRP.linhas = 100;
      parametrosVRP.dataInicial = this.dataInicial;
      parametrosVRP.dataFinal = this.dataFinal;
      this.ListarHistoricoVRP(parametrosVRP);
    } else {
      this.messageService.add({severity:'warn', summary:'Atenção', detail: 'A data final deve ser maior que a data inicial.'});
    }
  }

  Voltar() {
    this.boolVisualizarHistorico = false;
  }

  AtualizarHistorico() {
    let parametrosVRP: ParamListaHistoricoModel = { idVRP: 0, dataInicial: undefined, dataFinal: undefined, linhas: 0 };
    parametrosVRP.idVRP = this.idVRP;
    parametrosVRP.linhas = 100;
    this.ListarHistoricoVRP(parametrosVRP);
  }

}
