export interface PontoCriticoModel {
  idPC: number;
  descPC: string;
  modeloPC: string;
  logradouroPC: string;
  numeroPC: string;
  bairroPC: string;
  cepPC: string;
  latitudePC: number;
  longitudePC: number;
  imagemPC: string;
  idCidade: number;
  descCidade: string;
  idNumCel: number;
  tempoEnvioMinutos: number;
  fatorMultVaz: number;
  statusVazao: boolean;
  statusPC: boolean;
}
