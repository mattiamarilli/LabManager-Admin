export interface Session{
    ses_id:number;
    ses_creazione:string;
    ses_chiusura:string;
    ses_attiva:number;
    ses_doc_id:number;
    ses_cla_id:number;
    }[];

    export class User {
        id: number;
        username: string;
        password: string;
        firstName: string;
        lastName: string;
        token?: string;
    }