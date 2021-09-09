import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { VRPModel } from 'src/app/models/vrp.model';
import { HttpService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-gerenciar-vrp',
  templateUrl: './gerenciar-vrp.component.html',
  styleUrls: ['./gerenciar-vrp.component.css'],
  providers: [MessageService],
})
export class GerenciarVRPComponent implements OnInit {
  boolLoading = false;
  boolEditarParametros = false;
  msgs: any[] = [];
  listaVRP: VRPModel[] = [];
  // objVRP: VRPModel = {idVRP: 0, descrVRP: '', modelo: '', logradouro: '', numero: '', bairro: '', cep: '', latitude: 0, longitude: 0, imagem: '', idCidade: 0, descCidade: '', idNumCel: 0, tempoEnvioMinutos: 0, fatorMultVaz: 0, status: false};
  idVRP = 0;

  pressaoInvalida = false;
  horaInInvalida = false;
  horaFiInvalida = false;

  constructor(
    private http: HttpService,
    private messageService: MessageService,
    private router: Router,
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

  EditarVRP(idVRP: number) {
    // console.log(idVRP);
    this.router.navigate(['/home/cadastroVRP'], { queryParams: { idVRP: idVRP } });
  }

}
