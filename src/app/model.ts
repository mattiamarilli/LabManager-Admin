export interface Session{
    ses_id:number;
    ses_creazione:string;
    ses_chiusura:string;
    ses_attiva:number;
    ses_doc_id:number;
    ses_cla_id:number;
    }[];

    export class User {
        doc_id: number;
        doc_nome: string;
        doc_cognome: string;
        doc_username: string;
        doc_password: string;
        token?: string;
    }