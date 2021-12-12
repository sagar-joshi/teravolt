import {Login} from './Login.js';
import {Profile} from './Profile.js';
import { AuthContext } from '../utils/contexts.js';
import { useContext } from 'react';

export function Header(props){
    const auth = useContext(AuthContext);

    return (
        <div className='Header row h-100'>
            <div className='col-10'>

            </div>
            <div className='col-2 d-flex justify-content-end'>
                {auth.user?<Profile/>:<Login/>}
            </div>
        </div>
    )
}