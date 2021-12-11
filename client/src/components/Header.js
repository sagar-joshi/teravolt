import {Login} from './Login.js';

export function Header(props){
    return (
        <div className='row'>
            <div className='col-10'>

            </div>
            <div className='col-2 d-flex justify-content-end'>
                <Login/>
            </div>
        </div>
    )
}