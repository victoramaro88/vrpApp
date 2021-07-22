import { HistoricoVRPComponent } from './pages/historico-vrp/historico-vrp.component';
import { ConteudoComponent } from './pages/layout/conteudo/conteudo.component';
import { HomeComponent } from './pages/layout/home/home.component';
import { ParametrosVRPComponent } from './pages/configs/parametros-vrp/parametros-vrp.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'conteudo', component: ConteudoComponent },
      { path: 'parametrosVRP', component: ParametrosVRPComponent },
      { path: 'historicoVRP', component: HistoricoVRPComponent },
    ]
  },
  // { path: 'dashboard', component: DashboardComponent },
  // { path: 'parametrosVRP', component: ParametrosVRPComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
