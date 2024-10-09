import {
    ECategory,
    EStatus,
    ETypeResources,
    ETypeLocalizations,
    ETypeProgramsEventEnum,
    ERole,
} from "./enum";

export interface IFrequencyPersonne {
    title: string;
    value: string;
}

// export interface IPersonnes {
//     pers_id?: number;
//     nom: string;
// prenom: string;
// email: string;
// adress: string;
// image: string;

    // date_debut: string;
    // programs?: IPrograms[];
// }

export interface IPersonnes {
    nom: string;
    prenom: string;
    email: string;
    phone: string;
    adress?: string;
    image?: string | null; // Accepter null en plus de string ou undefined
  }
  

export interface IPrograms {
    // debut_time: string;
    // description: string;
    // type: ETypeProgramsEventEnum;

    date_debut: string;
    date_end: string;
    debut_time: string;
    end_time: string;
    duration: number;
    type: ETypeProgramsEventEnum;
    description: string;
}


export interface IResources {
    id: number;
    campus_id: number;
    name: string;
    category: ECategory;
    type: ETypeResources;
    status: EStatus;
    created_at: string;
    updated_at: string;
}

export interface ITypeEvent {
    id: number;
    name: string;
    description: string;
    events_count: number;
    created_at: string;
    updated_at: string;
}

export interface IRole{
    user: string;
    admin: string
}

export interface IPostCode {
    id: number;
    country_code: string;
    country: string;
    code: string;
    state_code: string;
    created_at: string;
    updated_at: string;
}

export interface User {
    name: string;
    email: string;
    phoneNumber: string;
    image: string;
    password: string;
    status:  boolean;
role: IRole[];
}
export interface AuthForm {
    email: string;
    password: string;
    remember: boolean;
}

export interface IForgotPassword{
    email: string
    // newPassword: string
}

export interface LoginResponse {
    token: string; // Assurez-vous que la réponse du serveur contient un champ 'token'
    name: string;
    user: User;  // Inclure l'utilisateur ici
  }


  export interface ForgotpassResponse{
    password: string
  }

// export const formatDate = (date: Date) => {
//     const NonFormatedDate = new Date(date);
//     return `${NonFormatedDate.getDate()}/${NonFormatedDate.getMonth() + 1}/${NonFormatedDate.getFullYear()}`;
// };