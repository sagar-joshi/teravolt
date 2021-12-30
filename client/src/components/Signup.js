import { useState } from "react"
import {ax} from '../utils/axios.config.js';

export function Signup(props){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = ()=>{
        ax.post('/user/signup', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        })
        .then((res)=>{
            if(res.status === 201){
                props.updateToast("success");
            }
        })
        .catch((err)=>{
            props.updateToast("failed");
            console.log(err);
        })
    };

    const handlefirstNameChange = (e)=>{
        setFirstName(e.target.value);
    }
    const handlelastNameChange = (e)=>{
        setLastName(e.target.value);
    }
    const handleEmailChange = (e)=>{
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e)=>{
        setPassword(e.target.value);
    }

    return (
        <div className="h-100">
            <button type="button" className="btn btn-primary h-100 text-center" data-bs-toggle="modal" data-bs-target="#signUp">
                Sign up
            </button>

            <div className="modal fade" id="signUp" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header justify-content-center">
                            <h5 className="modal-title" id="exampleModalLabel">Sign up</h5>
                        </div>
                        <div className="modal-body d-flex flex-column align-items-center">
                            <div className='m-3'>
                                <input type="text" placeholder='First name' value={firstName} onChange={handlefirstNameChange}></input>
                            </div>
                            <div className='m-3'>
                                <input type="text" placeholder='Last name' value={lastName} onChange={handlelastNameChange}></input>
                            </div>
                            <div className='m-3'>
                                <input type="email" placeholder='E-mail' value={email} onChange={handleEmailChange}></input>
                            </div>
                            <div className='m-3'>
                                <input type="password" placeholder='Password' value={password} onChange={handlePasswordChange}></input>
                            </div>                                
                        </div>
                        <div className="modal-footer justify-content-center">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSignup}>Sign up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}