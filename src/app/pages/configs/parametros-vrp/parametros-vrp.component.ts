import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http-service.service';
import {MessageService} from 'primeng/api';
import { VRPModel } from 'src/app/models/vrp.model';
import { ParametrosVRPModel } from 'src/app/models/parametrosVRP.model';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-parametros-vrp',
  templateUrl: './parametros-vrp.component.html',
  styleUrls: ['./parametros-vrp.component.css'],
  providers: [MessageService],
  styles: [`
      :host ::ng-deep .p-cell-editing {
          padding-top: 0 !important;
          padding-bottom: 0 !important;
      }
  `]
})
export class ParametrosVRPComponent implements OnInit {
  boolLoading = false;
  boolEditarParametros = false;
  msgs: any[] = [];
  listaVRP: VRPModel[] = [];
  listaParametrosVRP: ParametrosVRPModel[] = [];
  statuses: SelectItem[] = [];
  clonedItens: { [s: string]: ParametrosVRPModel; } = {};
  item2: ParametrosVRPModel[] = [];

  constructor(
    private http: HttpService,
    private messageService: MessageService
    ) { }

  ngOnInit(): void {
    this.statuses = [{label: 'Ativo', value: true},{label: 'Inativo', value: false}]
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

  EditarParametros(idVRP: number) {
    this.boolLoading = true;
    this.boolEditarParametros = true;
    this.http.ListarParametrosVRP(idVRP).subscribe(response => {
      // console.log(response);
      if(response && response.length > 0) {
        this.listaParametrosVRP = response;
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

  onRowEditInit(item: ParametrosVRPModel) {
    this.clonedItens[item.idParametro] = {...item};
  }

  onRowEditSave(item: ParametrosVRPModel) {
    this.boolLoading = true;
    if (item.pressao > 0) { //-> FAZER A VALIDAÇÃO AINDA!!!
      this.http.AlteraItemParaMetroVRP(item).subscribe(response => {
        if(response && response.toString() === 'OK') {
          delete this.clonedItens[item.idParametro];
          this.messageService.add({severity:'success', summary: 'Sucesso!', detail:'Item atualizado com sucesso!'});
          // setTimeout(()=>{
          //   this.CancelarOperacao();
          // }, 1000);
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
    else {
        this.messageService.add({severity:'error', summary: 'Error', detail:'Invalid Price'});
    }
  }

  onRowEditCancel(item: ParametrosVRPModel, index: number) {
    this.item2[index] = this.clonedItens[item.idParametro];
    delete this.clonedItens[item.idParametro];
  }

  CancelarOperacao() {
    this.boolEditarParametros = false;
    this.listaParametrosVRP= [];
    this.clonedItens= {};
    this.item2= [];
  }
}
