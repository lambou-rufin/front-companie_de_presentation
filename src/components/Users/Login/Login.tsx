import React, {FC } from 'react'

const Login: FC = () =>{
     return (
        <div className='form'>
         <form>
            <label>Nom</label>
            <input type="text" />
            <label>Email</label>
            <input type="text" />
            <label>Password</label>
            <input type="text" />
            <button type="button">Enregistrer</button>
         </form>
        </div>
     )
}

export default Login;