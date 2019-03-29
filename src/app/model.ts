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

export class Categoria {
    id_categoria: number;
    nome: String;
    cognome: String;
}


export class Studente {
    id: number;
    nome: string;
    cognome: string;
    id_classe: number;
    classe: string;
    id_gruppo: number;
    username: string
} []

<<<<<<< HEAD
export class Utensile {
    id_utensile: number;
    nome: string;
    segnala: boolean;
    id_categoria: number;
    categoria: string;
} []

export class Gruppi{
    id: number;
    nome: string;
    cognome: string;
}
=======
        id_classe: number;
        nome: string;
        anno_scolastico: number;
        scadenza: number; // timestamp
        enabled: boolean;
}[]

    export class Studenti
    {
        id: number;
        nome: string; 
        cognome: string; 
        id_classe: number; 
        classe: string;
        id_gruppo: number;
        username: string
    }[]

    export class Utensile {
        id_utensile: number;
        nome: string;
        segnala: boolean;
        id_categoria: number;
        categoria: string;
    }[]

>>>>>>> 0058a3cad06fa24d0e0bd56d7ff629ef4284ffb3



