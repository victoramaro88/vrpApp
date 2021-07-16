import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ParametrosVRPModel } from "../models/parametrosVRP.model";
import { UsuarioModel } from "../models/usuario.model";
import { VRPModel } from "../models/vrp.model";

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
}
