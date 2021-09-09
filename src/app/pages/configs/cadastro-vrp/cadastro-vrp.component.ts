import { CidadeModel } from './../../../models/cidade.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { VRPModel } from 'src/app/models/vrp.model';
import { HttpService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-cadastro-vrp',
  templateUrl: './cadastro-vrp.component.html',
  styleUrls: ['./cadastro-vrp.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class CadastroVRPComponent implements OnInit {
  boolLoading = false;
  boolEditarParametros = false;
  msgs: any[] = [];
  lstCidade: CidadeModel[] = [];
  objCidade: CidadeModel = {idCidade: 0, descCidade: '0', codigoIBGE: 0, idEstado: 0};
  cidadeSelecionada: CidadeModel = {idCidade: 0, descCidade: '0', codigoIBGE: 0, idEstado: 0};
  // listaVRP: VRPModel[] = [];
  objVRP: VRPModel = {idVRP: 0, descrVRP: '', modelo: '', logradouro: '', numero: '', bairro: '', cep: '', latitude: 0, longitude: 0, imagem: '', idCidade: 0, descCidade: '', idNumCel: 0, tempoEnvioMinutos: 0, fatorMultVaz: 0, status: false};
  idVRP = 0;

  pressaoInvalida = false;
  horaInInvalida = false;
  horaFiInvalida = false;

  constructor(
    private http: HttpService,
    private messageService: MessageService,
    private route: ActivatedRoute
    ) {
      this.route.queryParams.subscribe(params => {
        this.idVRP = params['idVRP'];
      });
    }

  ngOnInit(): void {
    this.ListaCidade(0);
    this.ListaNumeroCelularOperadora(0); // ->JOGAR PARA DENTRO DO LISTAR CIDADE, E COLOCAR O LISTAR VRP DENTRO DO LISTAROPERADORA
  }

  ListaNumeroCelularOperadora(idNumCel: number) {
    this.http.ListaNumeroCelularOperadora(idNumCel).subscribe(response => {
      console.log(response);
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

  ListaCidade (idCidade: number) {
    this.http.ListaCidade(idCidade).subscribe(response => {
      if(response && response.length > 0) {
        this.lstCidade = response;
      }
      if(this.idVRP && this.idVRP > 0) {
        let objCida = this.lstCidade.find(c => c.idCidade === this.objVRP.idCidade);
        this.objCidade = objCida ? objCida : {idCidade: 0, descCidade: '0', codigoIBGE: 0, idEstado: 0};
      }
      // console.log(this.lstCidade);
      // console.log(this.objCidade);



      //-> Preenchendo a VRP Selecionada.
      if(this.idVRP !== undefined && this.idVRP > 0) {
        this.ListarVRP(this.idVRP);
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

  ListarVRP(idVRP: number) {
    this.boolLoading = true;
    this.http.ListarVRP(idVRP).subscribe(response => {
      // console.log(response);
      if(response && response.length > 0) {
        for (const itemVRP of response) {
          this.objVRP.idVRP = itemVRP.idVRP;
          this.objVRP.descrVRP = itemVRP.descrVRP;
          this.objVRP.modelo = itemVRP.modelo;
          this.objVRP.logradouro = itemVRP.logradouro;
          this.objVRP.numero = itemVRP.numero;
          this.objVRP.bairro = itemVRP.bairro;
          this.objVRP.cep = itemVRP.cep;
          this.objVRP.latitude = itemVRP.latitude;
          this.objVRP.longitude = itemVRP.longitude;
          this.objVRP.imagem = itemVRP.imagem;
          this.objVRP.idCidade = itemVRP.idCidade;
          this.objVRP.descCidade = itemVRP.descCidade;
          this.objVRP.idNumCel = itemVRP.idNumCel;
          this.objVRP.tempoEnvioMinutos = itemVRP.tempoEnvioMinutos;
          this.objVRP.fatorMultVaz = itemVRP.fatorMultVaz;
          this.objVRP.status = itemVRP.status;

          let cidaSel = this.lstCidade.find(c => c.idCidade === itemVRP.idCidade);
          this.cidadeSelecionada = cidaSel ? cidaSel : {idCidade: 0, descCidade: '0', codigoIBGE: 0, idEstado: 0};
        }
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

  Salvar() {
    this.objVRP.idCidade = this.cidadeSelecionada.idCidade;
    console.log(this.objVRP);
  }
}
