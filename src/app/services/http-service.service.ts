import { CidadeModel } from './../models/cidade.model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HistoricoVRPModel } from "../models/historicoVRP.model";
import { ParametrosVRPModel } from "../models/parametrosVRP.model";
import { ParamListaHistoricoModel } from "../models/paramListaHistorico.model";
import { PerfilUsuarioModel } from "../models/perfil.model";
import { UsuarioModel } from "../models/usuario.model";
import { VRPModel } from "../models/vrp.model";
import { NumeroCelOperModel } from '../models/numeroCelOper.model';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  constructor(private http: HttpClient) { }

  public validarLogin(cpf: string, senha: string): Observable<UsuarioModel> {
    return this.http.get<UsuarioModel>(`${environment.urlAPI}/Usuario/LoginUsuario/${cpf}/${senha}`);
  }

  public ListarVRP(idVRP: number): Observable<VRPModel[]> {
    return this.http.get<VRPModel[]>(`${environment.urlAPI}/VRP/ListaVRP/${idVRP}`);
  }

  public ListarParametrosVRP(idVRP: number): Observable<ParametrosVRPModel[]> {
    return this.http.get<ParametrosVRPModel[]>(`${environment.urlAPI}/VRP/ListaParametrosVRP/${idVRP}`);
  }

  public AlteraItemParaMetroVRP(objParametro: ParametrosVRPModel): Observable<string> {
    return this.http.post<string>(`${environment.urlAPI}/VRP/AlteraItemParaMetroVRP`, objParametro);
  }

  public ManterParametrosVRP(objParametros: ParametrosVRPModel[]): Observable<string> {
    return this.http.post<string>(`${environment.urlAPI}/VRP/ManterParametrosVRP`, objParametros);
  }

  public ListarHistoricoVRP(objParametros: ParamListaHistoricoModel): Observable<HistoricoVRPModel[]> {
    return this.http.post<HistoricoVRPModel[]>(`${environment.urlAPI}/VRP/ListaHistoricoVRP`, objParametros);
  }

  public ListarPerfil(idPerfil: number): Observable<PerfilUsuarioModel[]> {
    return this.http.get<PerfilUsuarioModel[]>(`${environment.urlAPI}/Usuario/BuscarPerfil/${idPerfil}`);
  }

  public ManterUsuario(objUsuario: UsuarioModel): Observable<string> {
    return this.http.post<string>(`${environment.urlAPI}/Usuario/ManterUsuario`, objUsuario);
  }

  public InserirUsuario(objUsuario: UsuarioModel): Observable<string> {
    return this.http.post<string>(`${environment.urlAPI}/Usuario/InserirUsuario`, objUsuario);
  }

  public BuscarUsuario(cpf: string): Observable<UsuarioModel[]> {
    return this.http.get<UsuarioModel[]>(`${environment.urlAPI}/Usuario/BuscarUsuario/${cpf}`);
  }

  public AlteraStatusUsuario(idUsuario: number, statusUsuario: boolean): Observable<string> {
    return this.http.get<string>(`${environment.urlAPI}/Usuario/AlteraStatusUsuario/${idUsuario}/${statusUsuario}`);
  }

  public ListaCidade(idCidade: number): Observable<CidadeModel[]> {
    return this.http.get<CidadeModel[]>(`${environment.urlAPI}/VRP/ListaCidade/${idCidade}`);
  }

  public ListaNumeroCelularOperadora(idNumCel: number): Observable<NumeroCelOperModel[]> {
    return this.http.get<NumeroCelOperModel[]>(`${environment.urlAPI}/VRP/ListaNumeroCelularOperadora/${idNumCel}`);
  }
}
