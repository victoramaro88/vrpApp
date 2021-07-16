import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule }   from '@angular/forms';

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
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MenuComponent } from './pages/menu/menu.component';
import {PanelMenuModule} from 'primeng/panelmenu';
import { ParametrosVRPComponent } from './pages/configs/parametros-vrp/parametros-vrp.component';
import { HomeComponent } from './pages/layout/home/home.component';
import { ConteudoComponent } from './pages/layout/conteudo/conteudo.component';
import {MenubarModule} from 'primeng/menubar';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MenuComponent,
    ParametrosVRPComponent,
    HomeComponent,
    ConteudoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,

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
    DropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
