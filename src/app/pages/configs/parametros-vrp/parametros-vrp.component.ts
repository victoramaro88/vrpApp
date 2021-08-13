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
  // objVRP: VRPModel = {idVRP: 0, descrVRP: '', modelo: '', logradouro: '', numero: '', bairro: '', cep: '', latitude: 0, longitude: 0, imagem: '', idCidade: 0, descCidade: '', idNumCel: 0, tempoEnvioMinutos: 0, fatorMultVaz: 0, status: false};
  listaParametrosVRP: ParametrosVRPModel[] = [];
  objParametro: ParametrosVRPModel = {idParametro: 0, pressao: 0, horaInicial: '', horaFinal: '', idVRP: 0, flStatus: false};
  statuses: SelectItem[] = [];
  clonedItens: { [s: string]: ParametrosVRPModel; } = {};
  item2: ParametrosVRPModel[] = [];
  novoparametro = false;

  pressaoInvalida = false;
  horaInInvalida = false;
  horaFiInvalida = false;

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
    // let indexListaVRP = this.listaVRP.findIndex(v => v.idVRP === idVRP);
    // this.objVRP = this.listaVRP[indexListaVRP];
    // console.log(this.objVRP);
    this.boolEditarParametros = true;
    this.http.ListarParametrosVRP(idVRP).subscribe(response => {
      console.log(response);
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
        this.messageService.add({severity:'error', summary: 'Error', detail:'Valor inválido!'});
        this.boolLoading = false;
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

  ValidaInformacoesNovoParametro() {
    if(this.objParametro.pressao >= 0) {
      this.pressaoInvalida = false;
    } else {
      this.pressaoInvalida = true;
    }

    if(this.VerificaHoraValida(this.objParametro.horaInicial)) {
      this.horaInInvalida = false;
    } else {
      this.horaInInvalida = true;
    }

    if(this.VerificaHoraValida(this.objParametro.horaFinal)) {
      if(this.objParametro.horaInicial.split(':')[0] <= this.objParametro.horaFinal.split(':')[0]) {
        if(this.objParametro.horaInicial.split(':')[1] < this.objParametro.horaFinal.split(':')[1]) {
          this.horaFiInvalida = false;
        } else {
          this.horaInInvalida = true;
          this.horaFiInvalida = true;
        }
      } else {
        this.horaInInvalida = true;
        this.horaFiInvalida = true;
      }
    } else {
      this.horaFiInvalida = true;
    }
  }

  VerificaHoraValida(horaMin: string) {
    console.log(horaMin.split(':'));
    if(horaMin.length === 5 && horaMin.split(':').length <= 2) {
      let hora = horaMin.split(':')[0];
      let mint = horaMin.split(':')[1];
      if(+hora <= 23 && +mint <= 59) {
        return true;
      } else {
        return false;
      }
    }else {
      return false;
    }
  }
}
