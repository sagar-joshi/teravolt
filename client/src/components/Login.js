import { useContext, useState } from "react"
import {ax} from '../utils/axios.config.js';
import { AuthContext } from "../utils/contexts.js";

export function Login(props){
    const auth = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = ()=>{
        ax.post('/user/login', {
            email: email,
            password: password
        })
        .then((res)=>{
            if(res.status === 200)
                auth.updateUser();
        })
        .catch((err)=>{
            console.log(err);
        })
    };
    const handleEmailChange = (e)=>{
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e)=>{
        setPassword(e.target.value);
    }
    return (
        <div className="h-100">
            <button type="button" className="btn btn-primary h-100" data-bs-toggle="modal" data-bs-target="#loginModal">
                Log in
                </button>

                <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header justify-content-center">
                                <h5 className="modal-title" id="exampleModalLabel">Log in</h5>
                            </div>
                            <div className="modal-body d-flex flex-column align-items-center">
                                <div className='m-3'>
                                    <input type="text" placeholder='Enter email here' value={email} onChange={handleEmailChange}></input>
                                </div>
                                <div className='m-3'>
                                    <input type="password" placeholder='Enter password here' value={password} onChange={handlePasswordChange}></input>
                                </div>                                
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleLogin}>Log in</button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}