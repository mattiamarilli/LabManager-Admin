export class AuthUser {
    id: number;
    nome: string;
    cognome:string;
    admin:boolean;
    token:string;
}

export class Classi {
    id_classe: number;
    nome: string;
    anno_scolastico: number;
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
    locked:boolean;
    id_categoria: number;
    categoria: string;
}

export class Docenti{
    id_docente:number;
    nome:string;
    cognome:string;
    admin:boolean;
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

export class DeletedTool{
  nome:string;
  categoria:string;
}
export class UsedTool{
  nome:string;
  utilizzi:number;
}

export class StudentiUtilizzatori{
    nome:string;
    cognome:string;
}
