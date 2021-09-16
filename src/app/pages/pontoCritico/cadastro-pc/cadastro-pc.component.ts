import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CidadeModel } from 'src/app/models/cidade.model';
import { NumeroCelOperModel } from 'src/app/models/numeroCelOper.model';
import { PontoCriticoModel } from 'src/app/models/pontoCritico.model';
import { HttpService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-cadastro-pc',
  templateUrl: './cadastro-pc.component.html',
  styleUrls: ['./cadastro-pc.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class CadastroPCComponent implements OnInit {
  boolLoading = false;
  boolEditarParametros = false;
  stateOptions: any[];
  msgs: any[] = [];
  lstCidade: CidadeModel[] = [];
  objCidade: CidadeModel = {idCidade: 0, descCidade: '0', codigoIBGE: 0, idEstado: 0};
  cidadeSelecionada: CidadeModel = {idCidade: 0, descCidade: '0', codigoIBGE: 0, idEstado: 0};
  lstNumCelOper: NumeroCelOperModel[] = [];
  objNumCelOper: NumeroCelOperModel = {idNumCel: 0, ddi: '', ddd: '', numero: '', idOperadora: 0, status: false, descricaoOperadora: '', statusOperadora: false};
  numCelOperSelecionado: NumeroCelOperModel = {idNumCel: 0, ddi: '', ddd: '', numero: '', idOperadora: 0, status: false, descricaoOperadora: '', statusOperadora: false};
  objPC: PontoCriticoModel = {idPC: 0, descPC: '', modeloPC: '', logradouroPC: '', numeroPC: '', bairroPC: '', cepPC: '', latitudePC: 0, longitudePC: 0, imagemPC: '', idCidade: 0, descCidade: '', idNumCel: 0, tempoEnvioMinutos: 0, fatorMultVaz: 0, statusVazao: false, statusPC: true};
  idPC = 0;

  constructor(
    private http: HttpService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    ) {
      this.stateOptions = [{label: 'Inativa', value: false}, {label: 'Ativa', value: true}];
      this.route.queryParams.subscribe(params => {
        this.idPC = params['idPC'];
      });
    }

  ngOnInit(): void {
    this.ListaCidade(0);
  }

  ListaCidade(idCidade: number) {
    this.http.ListaCidade(idCidade).subscribe(response => {
      if(response && response.length > 0) {
        this.lstCidade = response;
      }

      this.ListaNumeroCelularOperadora(0);
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

  ListaNumeroCelularOperadora(idNumCel: number) {
    this.http.ListaNumeroCelularOperadora(idNumCel).subscribe(response => {
      if(response && response.length > 0) {
        for (const itemCel of response) {
          let objCel: NumeroCelOperModel = {
            idNumCel: itemCel.idNumCel,
            ddi: itemCel.ddi,
            ddd: itemCel.ddd,
            numero: '(' + itemCel.ddd + ') ' + itemCel.numero,
            idOperadora:itemCel.idOperadora,
            status: itemCel.status,
            descricaoOperadora: itemCel.descricaoOperadora,
            statusOperadora: itemCel.statusOperadora
          };
          this.lstNumCelOper.push(objCel);
        }
      }

      //-> Se for edição, busca a VRP, preenche o número de celular e a cidade.
      if(this.idPC !== undefined && this.idPC > 0) {
        this.ListarPC(this.idPC);
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

  ListarPC(idPC: number) {
    this.boolLoading = true;
    this.http.ListarPC(idPC).subscribe(response => {
      if(response && response.length > 0) {
        for (const itemPC of response) {
          this.objPC.idPC = itemPC.idPC;
          this.objPC.descPC = itemPC.descPC;
          this.objPC.modeloPC = itemPC.modeloPC;
          this.objPC.logradouroPC = itemPC.logradouroPC;
          this.objPC.numeroPC = itemPC.numeroPC;
          this.objPC.bairroPC = itemPC.bairroPC;
          this.objPC.cepPC = itemPC.cepPC;
          this.objPC.latitudePC = itemPC.latitudePC;
          this.objPC.longitudePC = itemPC.longitudePC;
          this.objPC.imagemPC = itemPC.imagemPC;
          this.objPC.idCidade = itemPC.idCidade;
          this.objPC.descCidade = itemPC.descCidade;
          this.objPC.idNumCel = itemPC.idNumCel;
          this.objPC.tempoEnvioMinutos = itemPC.tempoEnvioMinutos;
          this.objPC.fatorMultVaz = itemPC.fatorMultVaz;
          this.objPC.statusVazao = itemPC.statusVazao;
          this.objPC.statusPC = itemPC.statusPC;

          let cidaSel = this.lstCidade.find(c => c.idCidade === itemPC.idCidade);
          this.objCidade = cidaSel ? cidaSel : {idCidade: 0, descCidade: '0', codigoIBGE: 0, idEstado: 0};
          this.cidadeSelecionada = cidaSel ? cidaSel : {idCidade: 0, descCidade: '0', codigoIBGE: 0, idEstado: 0};

          let numCel = this.lstNumCelOper.find(n => n.idNumCel === itemPC.idNumCel);
          this.objNumCelOper = numCel ? numCel : {idNumCel: 0, ddi: '', ddd: '', numero: '', idOperadora: 0, status: false, descricaoOperadora: '', statusOperadora: false};
          this.numCelOperSelecionado = numCel ? numCel : {idNumCel: 0, ddi: '', ddd: '', numero: '', idOperadora: 0, status: false, descricaoOperadora: '', statusOperadora: false};
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

  VerificaNumCelPC () {
    // this.boolLoading = true;
    // this.http.VerificaNumCelVRP(this.numCelOperSelecionado.idNumCel).subscribe(response => {
    //   if(this.idVRP == 0 && response && response.length > 0) {
    //     this.messageService.add({severity:'warn', summary:'Atenção', detail:'Número de celular já utilizado em uma VRP, selecione outro.'});
    //     this.numCelOperSelecionado = {idNumCel: 0, ddi: '', ddd: '', numero: '', idOperadora: 0, status: false, descricaoOperadora: '', statusOperadora: false};
    //   } else {
    //     if(this.objVRP.idVRP !== response[0].idVRP) {
    //       this.messageService.add({severity:'warn', summary:'Atenção', detail:'Número de celular já utilizado em uma VRP, selecione outro.'});
    //       this.numCelOperSelecionado = {idNumCel: 0, ddi: '', ddd: '', numero: '', idOperadora: 0, status: false, descricaoOperadora: '', statusOperadora: false};
    //     }
    //   }
    //   this.boolLoading = false;
    // }, error => {
    //   this.msgs = [];
    //   console.log(error);
    //   if(error.status === 404) {
    //     this.messageService.add({severity:'error', summary:'Erro', detail:'Erro ao conectar com o servidor.'});
    //   } else {
    //     this.messageService.add({severity:'error', summary:'Erro', detail: error.message});
    //   }
    //   this.boolLoading = false;
    // });
  }

  Salvar() {
    if(this.ValidaInfo()) {
      this.confirmationService.confirm({
        message: 'Deseja salvar as alterações realizadas?',
        accept: () => {
          this.boolLoading = true;
          this.objPC.idCidade = this.cidadeSelecionada.idCidade;
          this.objPC.idNumCel = this.numCelOperSelecionado.idNumCel;
          this.ManterPC(this.objPC);
        }
      });
    }
  }

  ManterPC(objPC: PontoCriticoModel) {
    this.http.ManterPC(objPC).subscribe(response => {
      if(response && response === 'OK') {
        this.boolLoading = false;
        this.messageService.add({severity:'success', summary:'Sucesso!', detail:'Registro salvo com sucesso!'});
        setTimeout(() => {
          this.router.navigate(['/home/gerenciarPC']);
        }, 2000);
      } else {
        this.boolLoading = false;
        this.messageService.add({severity:'error', summary:'Erro', detail: response.toString()});
      }
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

  ValidaInfo() {
    if(this.objPC.descPC.length > 0) {
      if(this.objPC.modeloPC.length > 0) {
        if(this.objPC.logradouroPC.length > 0) {
          if(this.objPC.numeroPC.length > 0) {
            if(this.objPC.bairroPC.length > 0) {
              if(this.cidadeSelecionada.idCidade > 0) {
                if(this.objPC.cepPC.length === 9) {
                  if(this.objPC.latitudePC.toString().length >= 0) {
                    if(this.objPC.longitudePC.toString().length >= 0) {
                      if(this.numCelOperSelecionado.idNumCel > 0) {
                        if(this.objPC.tempoEnvioMinutos > 0) {
                          if(this.objPC.fatorMultVaz > 0) {
                            return true;
                          } else {
                            this.messageService.add({severity:'warn', summary:'Atenção', detail: 'Digite o fator de vazão do ponto crítico!'});
                            return false;
                          }
                        } else {
                          this.messageService.add({severity:'warn', summary:'Atenção', detail: 'Digite o tempo de envio de dados do ponto crítico!'});
                          return false;
                        }
                      } else {
                        this.messageService.add({severity:'warn', summary:'Atenção', detail: 'Selecione o número de celular do ponto crítico!'});
                        return false;
                      }
                    } else {
                      this.messageService.add({severity:'warn', summary:'Atenção', detail: 'Digite a longitude do ponto crítico!'});
                      return false;
                    }
                  } else {
                    this.messageService.add({severity:'warn', summary:'Atenção', detail: 'Digite a latitude do ponto crítico!'});
                    return false;
                  }
                } else {
                  this.messageService.add({severity:'warn', summary:'Atenção', detail: 'Digite o CEP do ponto crítico!'});
                  return false;
                }
              } else {
                this.messageService.add({severity:'warn', summary:'Atenção', detail: 'Selecione a cidade do ponto crítico!'});
                return false;
              }
            } else {
              this.messageService.add({severity:'warn', summary:'Atenção', detail: 'Digite o bairro do ponto crítico!'});
              return false;
            }
          } else {
            this.messageService.add({severity:'warn', summary:'Atenção', detail: 'Digite o nº do logradouro do ponto crítico!'});
            return false;
          }
        } else {
          this.messageService.add({severity:'warn', summary:'Atenção', detail: 'Digite o logradouro do ponto crítico!'});
          return false;
        }
      } else {
        this.messageService.add({severity:'warn', summary:'Atenção', detail: 'Digite o modelo do ponto crítico!'});
        return false;
      }
    } else {
      this.messageService.add({severity:'warn', summary:'Atenção', detail: 'Digite a descrição do ponto crítico!'});
      return false;
    }
  }

}
