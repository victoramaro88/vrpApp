import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MenuComponent } from './pages/menu/menu.component';
import { GerenciarUsuariosComponent } from './pages/configs/gerenciar-usuarios/gerenciar-usuarios.component';
import { ParametrosVRPComponent } from './pages/configs/parametros-vrp/parametros-vrp.component';
import { HomeComponent } from './pages/layout/home/home.component';
import { ConteudoComponent } from './pages/layout/conteudo/conteudo.component';
import { HistoricoVRPComponent } from './pages/historico-vrp/historico-vrp.component';
import { UsuarioComponent } from './pages/configs/usuario/usuario.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule }   from '@angular/forms';

import { NgxMaskModule, IConfig } from 'ngx-mask'

import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {BlockUIModule} from 'primeng/blockui';
import {ProgressBarModule} from 'primeng/progressbar';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {CardModule} from 'primeng/card';
import {InputMaskModule} from 'primeng/inputmask';
import {RippleModule} from 'primeng/ripple';
import {ToastModule} from 'primeng/toast';
import {PanelMenuModule} from 'primeng/panelmenu';
import {MenubarModule} from 'primeng/menubar';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {SelectButtonModule} from 'primeng/selectbutton';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { NovoUsuarioComponent } from './pages/configs/novo-usuario/novo-usuario.component';

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MenuComponent,
    ParametrosVRPComponent,
    HomeComponent,
    ConteudoComponent,
    HistoricoVRPComponent,
    UsuarioComponent,
    GerenciarUsuariosComponent,
    NovoUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,

    NgxMaskModule.forRoot(maskConfigFunction),

    MessagesModule,
    MessageModule,
    BlockUIModule,
    ProgressBarModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CardModule,
    InputMaskModule,
    RippleModule,
    ToastModule,
    PanelMenuModule,
    MenubarModule,
    TableModule,
    DropdownModule,
    CalendarModule,
    SelectButtonModule,
    ConfirmDialogModule,
    ProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
