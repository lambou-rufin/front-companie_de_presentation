import React, { FC } from 'react'
import { getLangageDeProgrammation } from '../../services/langageDeProgrammation';

getLangageDeProgrammation();

const LangageDeProgrammation: FC = () =>{
     return(
        <div>Langage De Programmation</div>
     )
}

export default LangageDeProgrammation;