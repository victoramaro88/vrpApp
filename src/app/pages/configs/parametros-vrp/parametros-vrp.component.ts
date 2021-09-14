import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http-service.service';
import {MessageService} from 'primeng/api';
import { VRPModel } from 'src/app/models/vrp.model';
import { ParametrosVRPModel } from 'src/app/models/parametrosVRP.model';
import { SelectItem } from 'primeng/api';
import { _isNumberValue } from '@angular/cdk/coercion';

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
  objParametro: ParametrosVRPModel = {idParametro: 0, pressao: 0, horaInicial: '', horaFinal: '', pressaoFds: 0, idVRP: 0, sttAbertura: false, sttFechamento: false, flStatus: false};
  statuses: SelectItem[] = [];
  clonedItens: { [s: string]: ParametrosVRPModel; } = {};
  item2: ParametrosVRPModel[] = [];
  novoparametro = false;
  idVRP = 0;

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
    this.idVRP = idVRP;
    this.boolLoading = true;
    // let indexListaVRP = this.listaVRP.findIndex(v => v.idVRP === idVRP);
    // this.objVRP = this.listaVRP[indexListaVRP];
    // console.log(this.objVRP);
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
      if(this.objParametro.horaInicial.split(':')[0] === this.objParametro.horaFinal.split(':')[0]) {
        if(this.objParametro.horaInicial.split(':')[1] > this.objParametro.horaFinal.split(':')[1]) {
          // console.log('Horário final não pode ser menor que inicial.');
          this.horaInInvalida = true;
          this.horaFiInvalida = true;
        } else if(this.objParametro.horaInicial.split(':')[1] === this.objParametro.horaFinal.split(':')[1]) {
          // console.log('Horários não podem ser iguais.');
          this.horaFiInvalida = true;
        }
        else {
          this.horaInInvalida = false;
          this.horaFiInvalida = false;
        }
      } else if(this.objParametro.horaInicial.split(':')[0] < this.objParametro.horaFinal.split(':')[0]) {
        this.horaInInvalida = false;
        this.horaFiInvalida = false;
      }
      else {
        this.horaInInvalida = true;
        this.horaFiInvalida = true;
      }
    } else {
      this.horaFiInvalida = true;
    }
  }

  VerificaHoraValida(horaMin: string) {
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

  SalvarNovoParametro() {
    this.boolLoading = true;
    if(!this.pressaoInvalida && !this.horaInInvalida  && !this.horaFiInvalida
      && this.objParametro.pressao >= 0 && this.objParametro.pressaoFds >= 0 && this.objParametro.horaFinal.length > 0 && this.objParametro.horaInicial.length > 0) {

      let horaIn = this.objParametro.horaInicial.split(':')[0];
      let minutiIn = this.objParametro.horaInicial.split(':')[1];
      let horaFin = this.objParametro.horaFinal.split(':')[0];
      let minutiFin = this.objParametro.horaFinal.split(':')[1];
      const horaInicial = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(),
      (horaIn ? +horaIn : 0), minutiIn ? +minutiIn : 0);
      const horaFinal = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(),
      (horaFin ? +horaFin : 0), minutiFin ? +minutiFin : 0);
      console.log(horaInicial);
      console.log(horaFinal);

      for (const itemVRP of this.listaParametrosVRP) {
        let horaInVRP = itemVRP.horaInicial.split(':')[0];
        let minutiInVRP = itemVRP.horaInicial.split(':')[1];
        let horaFinVRP = itemVRP.horaFinal.split(':')[0];
        let minutiFinVRP = itemVRP.horaFinal.split(':')[1];
        const horaInicialVRP = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(),
        (horaInVRP ? +horaInVRP : 0), minutiInVRP ? +minutiInVRP : 0);
        const horaFinalVRP = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(),
        (horaFinVRP ? +horaFinVRP : 0), minutiFinVRP ? +minutiFinVRP : 0);

        if(horaIn >= horaInVRP && horaFin <= horaFinVRP) {
          console.log('JÁ EXISTE PROGRAMAÇÃO PARA ESSE HORÁRIO');
          this.boolLoading = false;
          return;
        }


        // console.log(horaInicialVRP);
        // console.log(horaFinalVRP);

        // console.log('Diff hora inicial: ' + (horaInicial.getTime()-horaInicialVRP.getTime())/ (1000 * 60));
        // console.log('Diff hora inicial: ' + (horaInicialVRP.getTime()-horaInicial.getTime())/ (1000 * 60));


        // const a = new Date(2021, 0, 1);
        // const b = new Date(2021, 0, 5);
        // console.log((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
        // console.log(itemVRP);


      }

      this.objParametro.flStatus = true;
      this.objParametro.idVRP = this.idVRP;

      this.listaParametrosVRP.push(this.objParametro);

      this.boolLoading = false;
      console.log(this.objParametro);
      console.log(this.listaParametrosVRP);
    } else {
      this.boolLoading = false;
      this.messageService.add({severity:'warn', summary:'Atenção', detail:'Valores inválidos, verifique.'});
    }
  }
}
