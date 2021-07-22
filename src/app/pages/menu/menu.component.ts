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
              icon: 'pi pi-sliders-h',
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
          label: 'Edit',
          icon: 'pi pi-fw pi-pencil',
          items: [
              {label: 'Delete', icon: 'pi pi-fw pi-trash'},
              {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
          ]
      },
      {
          label: 'Help',
          icon: 'pi pi-fw pi-question',
          items: [
              {
                  label: 'Contents',
                  icon: 'pi pi-pi pi-bars'
              },
              {
                  label: 'Search',
                  icon: 'pi pi-pi pi-search',
                  items: [
                      {
                          label: 'Text',
                          items: [
                              {
                                  label: 'Workspace'
                              }
                          ]
                      },
                      {
                          label: 'User',
                          icon: 'pi pi-fw pi-file',
                      }
              ]}
          ]
      },
      {
          label: 'Configurações',
          icon: 'pi pi-fw pi-cog',
          items: [
              {
                label: 'Parâmetros VRP',
                icon: 'pi pi-sliders-h',
                routerLink: '/home/parametrosVRP'
              },
              {
                  label: 'Other',
                  icon: 'pi pi-fw pi-tags',
                  items: [
                      {label: 'Delete', icon: 'pi pi-fw pi-minus'}
                  ]
              }
          ]
      }
    ];
  }

  Sair() {
    this.router.navigate(['/login']);
  }

}
