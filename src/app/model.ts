export class Auth {
    id: number;
    nome: string;
}

export class Classi {

    id_classe: number;
    nome: string;
    anno_scolastico: number;
    scadenza: number; // timestamp
    enabled: boolean;
} []

export interface Session {
    ses_id: number;
    ses_creazione: string;
    ses_chiusura: string;
    ses_attiva: number;
    ses_doc_id: number;
    ses_cla_id: number;
}[];

export class User {
    doc_id: number;
    doc_nome: string;
    doc_cognome: string;
    doc_username: string;
    doc_password: string;
    doc_token?: string;
}

export class Categorie {
    id_categoria: number;
    nome: String;
}[]


export class Studenti {
    id: number;
    nome: string;
    cognome: string;
    id_classe: number;
    classe: string;
    id_gruppo: number;
    username: string
} []

export class Utensili {
    id_utensile: number;
    nome: string;
    segnala: boolean;
    id_categoria: number;
    categoria: string;
} []

export class Gruppi{
    id_gruppo: number;
    studenti :{
        id_studente:number;
        nome:string;
        cognome:string;
        id_classe:number;
        classe:string;
    }[]
}[]



