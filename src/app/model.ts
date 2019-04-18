export interface IAuthUser {
    id: number;
    nome: string;
    cognome: string;
    admin: boolean;
}

export interface IClasse {
    id_classe?: number;
    nome: string;
    anno_scolastico: number;
    anno_scolastico_display?: string;
    enabled?: boolean;
}

export interface ICategoria {
    id_categoria: number;
    nome: string;
}

export interface IStudente {
    id: number;
    nome: string;
    cognome: string;
    id_classe: number;
    classe: string;
    id_gruppo: number;
    username: string;
}

export interface IUtensile {
    id_utensile: number;
    nome: string;
    segnala: boolean;
    id_categoria: number;
    categoria: string;
}

export interface IStudenteGruppo {
  id_studente: number;
  nome: string;
  cognome: string;
  id_classe: number;
  classe: string;
}

export interface IGruppo {
    id_gruppo: number;
    studenti: Array<IStudenteGruppo>;
}
