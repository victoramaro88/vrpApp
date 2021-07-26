import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  items: MenuItem[] = [];

  constructor(
    private router: Router,
    ) { }

  ngOnInit(): void {
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
              label: 'Histórico',
              icon: 'pi pi-chart-line',
              routerLink: '/home/historicoVRP'
            },
            {
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
          label: 'Usuário',
          icon: 'pi pi-user',
          items: [
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
