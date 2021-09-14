import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { UsuarioModel } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  items: MenuItem[] = [];
  objUsr: UsuarioModel = {idUsuario: 0, cpfUsuario:'', nomeUsuario:'', idPerfil: 0, statusUsuario: false, senhaUsuario: '', erroMensagem: ''};

  constructor(
    private router: Router,
    ) { }

  ngOnInit(): void {
    let sessionUser = sessionStorage.getItem('usr');
    this.objUsr = JSON.parse(sessionUser ? sessionUser : '');

    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-chart-bar',
        routerLink: '/home/dashboard'
      },
      {
          label: 'VRP',
          icon: 'pi pi-pw pi-briefcase',
          items: [
            {
              visible: (this.objUsr.idPerfil === 1 ? true : false),
              label: 'Gerenciar',
              icon: 'pi pi-globe',
              routerLink: '/home/gerenciarVRP'
            },
            {
              label: 'Histórico',
              icon: 'pi pi-chart-line',
              routerLink: '/home/historicoVRP'
            },
            {
                visible: (this.objUsr.idPerfil === 1 ? true : false),
                label: 'Configurações',
                icon: 'pi pi-fw pi-cog',
                items: [
                  {
                    label: 'Parâmetros',
                    icon: 'pi pi-sliders-h',
                    routerLink: '/home/parametrosVRP'
                  }
                ]
            }
        ]
      },
      {
          label: 'Ponto Crítico',
          icon: 'pi pi-exclamation-triangle',
          items: [
            {
              visible: (this.objUsr.idPerfil === 1 ? true : false),
              label: 'Gerenciar',
              icon: 'pi pi-globe',
              routerLink: '/home/gerenciarPC'
            },
            {
              label: 'Histórico',
              icon: 'pi pi-chart-line',
              routerLink: '/home/historicoPC'
            }
        ]
      },
      {
          label: 'Usuário',
          icon: 'pi pi-user',
          items: [
            {
              visible: (this.objUsr.idPerfil === 1 ? true : false),
              label: 'Gerenciar Usuários',
              icon: 'pi pi-user-plus',
              routerLink: '/home/gerenciarUsuarios'
            },
            {
              label: 'Meus dados',
              icon: 'pi pi-user-edit',
              routerLink: '/home/usuario'
            }
          ]
      },
      {
          label: 'Ajuda',
          icon: 'pi pi-fw pi-question',
          items: [
              {
                  label: 'Sobre',
                  icon: 'pi pi-info-circle'
              }
          ]
      }
    ];
  }

  Sair() {
    this.router.navigate(['/login']);
  }

}
