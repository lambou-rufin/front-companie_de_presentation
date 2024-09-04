import React, { FC } from 'react'
import { getTutorial } from '../../services/tutorial';

getTutorial();

const Tutorial: FC = () => {
    return(
        <div>Tutorial</div>
    )
}

export default Tutorial;