import { CidadeModel } from './../../../models/cidade.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { VRPModel } from 'src/app/models/vrp.model';
import { HttpService } from 'src/app/services/http-service.service';
import { NumeroCelOperModel } from 'src/app/models/numeroCelOper.model';

@Component({
  selector: 'app-cadastro-vrp',
  templateUrl: './cadastro-vrp.component.html',
  styleUrls: ['./cadastro-vrp.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class CadastroVRPComponent implements OnInit {
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
  objVRP: VRPModel = {idVRP: 0, descrVRP: '', modelo: '', logradouro: '', numero: '', bairro: '', cep: '', latitude: 0, longitude: 0, imagem: '', idCidade: 0, descCidade: '', idNumCel: 0, tempoEnvioMinutos: 0, fatorMultVaz: 0, status: true};
  idVRP = 0;

  pressaoInvalida = false;
  horaInInvalida = false;
  horaFiInvalida = false;

  constructor(
    private http: HttpService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    ) {
      this.stateOptions = [{label: 'Inativa', value: false}, {label: 'Ativa', value: true}];
      this.route.queryParams.subscribe(params => {
        this.idVRP = params['idVRP'];
      });
    }

  ngOnInit(): void {
    // this.ListaIDNumCel();
    this.ListaCidade(0);
    //this.ListaNumeroCelularOperadora(0); // ->JOGAR PARA DENTRO DO LISTAR CIDADE, E COLOCAR O LISTAR VRP DENTRO DO LISTAROPERADORA
  }

  VerificaNumCelVRP () {
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

  ListaIDNumCel() {
    this.http.ListaIDsNumCelUsados().subscribe(response => {
      // console.log(response);
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
          this.objCidade = cidaSel ? cidaSel : {idCidade: 0, descCidade: '0', codigoIBGE: 0, idEstado: 0};
          this.cidadeSelecionada = cidaSel ? cidaSel : {idCidade: 0, descCidade: '0', codigoIBGE: 0, idEstado: 0};

          let numCel = this.lstNumCelOper.find(n => n.idNumCel === itemVRP.idNumCel);
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

  Salvar() {
    if(this.ValidaInfo()) {
      this.confirmationService.confirm({
        message: 'Deseja salvar as alterações realizadas?',
        accept: () => {
          this.boolLoading = true;
          this.objVRP.idCidade = this.cidadeSelecionada.idCidade;
          this.objVRP.idNumCel = this.numCelOperSelecionado.idNumCel;
          this.ManterVRP(this.objVRP);
        }
      });
    }
  }

  ManterVRP(objVRP: VRPModel) {
    this.http.ManterVRP(objVRP).subscribe(response => {
      if(response && response === 'OK') {
        this.boolLoading = false;
        this.messageService.add({severity:'success', summary:'Sucesso!', detail:'Registro salvo com sucesso!'});
        setTimeout(() => {
          this.router.navigate(['/home/gerenciarVRP']);
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
    if(this.objVRP.descrVRP.length > 0) {
      if(this.objVRP.modelo.length > 0) {
        if(this.objVRP.logradouro.length > 0) {
          if(this.objVRP.numero.length > 0) {
            if(this.objVRP.bairro.length > 0) {
              if(this.cidadeSelecionada.idCidade > 0) {
                if(this.objVRP.cep.length === 9) {
                  if(this.objVRP.latitude.toString().length >= 0) {
                    if(this.objVRP.longitude.toString().length >= 0) {
                      if(this.numCelOperSelecionado.idNumCel > 0) {
                        if(this.objVRP.tempoEnvioMinutos > 0) {
                          if(this.objVRP.fatorMultVaz > 0) {
                            return true;
                          } else {
                            this.messageService.add({severity:'warn', summary:'Atenção', detail: 'Digite o fator de vazão da VRP!'});
                            return false;
                          }
                        } else {
                          this.messageService.add({severity:'warn', summary:'Atenção', detail: 'Digite o tempo de envio de dados da VRP!'});
                          return false;
                        }
                      } else {
                        this.messageService.add({severity:'warn', summary:'Atenção', detail: 'Selecione o número de celular da VRP!'});
                        return false;
                      }
                    } else {
                      this.messageService.add({severity:'warn', summary:'Atenção', detail: 'Digite a longitude da VRP!'});
                      return false;
                    }
                  } else {
                    this.messageService.add({severity:'warn', summary:'Atenção', detail: 'Digite a latitude da VRP!'});
                    return false;
                  }
                } else {
                  this.messageService.add({severity:'warn', summary:'Atenção', detail: 'Digite o CEP da VRP!'});
                  return false;
                }
              } else {
                this.messageService.add({severity:'warn', summary:'Atenção', detail: 'Selecione a cidade da VRP!'});
                return false;
              }
            } else {
              this.messageService.add({severity:'warn', summary:'Atenção', detail: 'Digite o bairro da VRP!'});
              return false;
            }
          } else {
            this.messageService.add({severity:'warn', summary:'Atenção', detail: 'Digite o nº do logradouro da VRP!'});
            return false;
          }
        } else {
          this.messageService.add({severity:'warn', summary:'Atenção', detail: 'Digite o logradouro da VRP!'});
          return false;
        }
      } else {
        this.messageService.add({severity:'warn', summary:'Atenção', detail: 'Digite o modelo da VRP!'});
        return false;
      }
    } else {
      this.messageService.add({severity:'warn', summary:'Atenção', detail: 'Digite a descrição da VRP!'});
      return false;
    }
  }

}
