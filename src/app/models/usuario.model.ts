export interface UsuarioModel {
  idUsuario: number;
  cpfUsuario: string;
  nomeUsuario: string;
  senhaUsuario: string;
  idPerfil: number;
  statusUsuario: boolean;
  erroMensagem: string;
}
