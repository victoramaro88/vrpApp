import { GerenciarVRPComponent } from './pages/configs/gerenciar-vrp/gerenciar-vrp.component';
import { CadastroVRPComponent } from './pages/configs/cadastro-vrp/cadastro-vrp.component';
import { GerenciarUsuariosComponent } from './pages/configs/gerenciar-usuarios/gerenciar-usuarios.component';
import { UsuarioComponent } from './pages/configs/usuario/usuario.component';
import { HistoricoVRPComponent } from './pages/historico-vrp/historico-vrp.component';
import { ConteudoComponent } from './pages/layout/conteudo/conteudo.component';
import { HomeComponent } from './pages/layout/home/home.component';
import { ParametrosVRPComponent } from './pages/configs/parametros-vrp/parametros-vrp.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NovoUsuarioComponent } from './pages/configs/novo-usuario/novo-usuario.component';
import { GerenciarpcComponent } from './pages/pontoCritico/gerenciarpc/gerenciarpc.component';
import { CadastroPCComponent } from './pages/pontoCritico/cadastro-pc/cadastro-pc.component';
import { HistoricoPCComponent } from './pages/pontoCritico/historico-pc/historico-pc.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'conteudo', component: ConteudoComponent },
      { path: 'parametrosVRP', component: ParametrosVRPComponent },
      { path: 'historicoVRP', component: HistoricoVRPComponent },
      { path: 'usuario', component: UsuarioComponent },
      { path: 'gerenciarUsuarios', component: GerenciarUsuariosComponent },
      { path: 'novoUsuario', component: NovoUsuarioComponent },
      { path: 'cadastroVRP', component: CadastroVRPComponent },
      { path: 'gerenciarVRP', component: GerenciarVRPComponent },
      { path: 'gerenciarPC', component: GerenciarpcComponent },
      { path: 'cadastroPC', component: CadastroPCComponent },
      { path: 'historicoPC', component: HistoricoPCComponent },
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
