import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
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
      console.log(response);
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

  VisualizarHistorico(idVRP: number) {
    this.boolVisualizarHistorico = true;
    console.log(idVRP);
  }

  Voltar() {
    this.boolVisualizarHistorico = false;
  }

}
