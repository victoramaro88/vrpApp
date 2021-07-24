export interface VRPModel {
  idVRP: number;
  descrVRP: string;
  modelo: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cep: string;
  latitude: number;
  longitude: number;
  imagem: string;
  idCidade: number;
  descCidade: string;
  idNumCel: number;
  tempoEnvioMinutos: number;
  status: boolean;
}
