export interface IAuthBody {
  username: string;
  password: string;
}

export interface IClasseBody {
  nome: string;
  anno_scolastico: number;
}

export interface IStudenteBody {
  nome: string;
  cognome: string;
  id_classe: number;

}

export interface IUtensileBody {
  nome: string;
  segnala: boolean;
  id_categoria: number;

}
