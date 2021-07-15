import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { UsuarioModel } from "../models/usuario.model";

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  constructor(private http: HttpClient) { }

  public validarLogin(cpf: string, senha: string): Observable<UsuarioModel> {
    return this.http.get<UsuarioModel>(`${environment.urlAPI}/Usuario/LoginUsuario/${cpf}/${senha}`);
  }
}
