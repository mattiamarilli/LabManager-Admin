export class AuthUser {
    id: number;
    nome: string;
    cognome:string;
    admin:boolean;
}

export class Classi {

    id_classe: number;
    nome: string;
    anno_scolastico: number;
    scadenza: number; // timestamp
    enabled: boolean;
} 


export class Categorie {
    id_categoria: number;
    nome: String;
}


export class Studenti {
    id: number;
    nome: string;
    cognome: string;
    id_classe: number;
    classe: string;
    id_gruppo: number;
    username: string
} 

export class Utensili {
    id_utensile: number;
    nome: string;
    segnala: boolean;
    id_categoria: number;
    categoria: string;
} 

export class Gruppi{
    id_gruppo: number;
    studenti :[
        {
        id_studente:number;
        nome:string;
        cognome:string;
        id_classe:number;
        classe:string;
    }]
}



