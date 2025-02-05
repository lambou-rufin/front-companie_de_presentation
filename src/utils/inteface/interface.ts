import {
    ECategory,
    EStatus,
    ETypeResources,
    ETypeProgramsEventEnum,
    ERole,
    TutorialStatus,
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
    pers_id: number;
    nom: string;
    prenom: string;
    email: string;
    phoneNumber: string;
    adress: string;
    image?: string | null;
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

 export interface AddPersonneProps {
    onAddPerson: (person: IPersonnes) => void;
    onClose: () => void;
    onSuccessToast: () => void;

  }

export interface ILanguage{
    nom: string
}
export interface AddLanguageProps {
    onAddLanguage: (language: ILanguage) => void;
    onClose: () => void;
  }


  export interface ITutorial {
    id?: number;
    title: string;
    description: string;
    designation: string;
    status: TutorialStatus; // Utilisation de l'énumération
    createdAt: Date; // Type Date
}
  
export interface UpdatePersonneProps {
    personne: {
      pers_id: string | number;  // Allow both string and number
      nom: string;
      prenom: string;
      email: string;
      phoneNumber: string;
      adress: string;
      image?: string;
    };
    isOpen: boolean;
    onUpdatePerson: (personne: IPersonnes) => void;
    onClose: () => void;
    title: string;
    onSuccessToast: () => void;
  }
  

  