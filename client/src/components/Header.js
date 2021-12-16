import {Login} from './Login.js';
import {Settings} from './Settings.js';
import { AuthContext } from '../utils/contexts.js';
import { useState, useContext } from 'react';
import { Signup } from './Signup.js';

export function Header(props){
    const auth = useContext(AuthContext);
    const [toast, setToast] = useState(null);

    let toastHeaderText = "";
    let toastBodyText = "";
    let toastClassName = "";
    let toastColorClass = "";
    if(toast==="success"){
        toastColorClass= "text-success";
        toastClassName = "show";
        toastHeaderText = "Sign up successfull";
        toastBodyText = "You can now log in";
    }else if(toast === "failed"){
        toastColorClass = "text-danger";
        toastClassName = "show";
        toastHeaderText = "Sign up failed";
        toastBodyText = "Please try again";
    }else{
        toastClassName = "hide";
    }

    const handleToastClose = ()=>{
        setToast(null);
    }

    const updateToast = (val)=>{
        setToast(val);
    }

    const toastElement =<div className='position-fixed top-0 start-50 translate-middle-x'>
                            <div className={`toast ${toastClassName}`} role="alert">
                            <div className="toast-header">
                                <strong className={`me-auto ${toastColorClass}`}>{toastHeaderText}</strong>
                                <button type="button" className="btn-close" onClick={handleToastClose}></button>
                            </div>
                            <div className="toast-body">
                                {toastBodyText}
                            </div>
                            </div>
                        </div>
    const rightCorner = auth.user?<Settings/>:  <div className='d-flex'>
                                                    <div className='ms-1 me-1'><Signup updateToast={updateToast}/></div>
                                                    <div className='ms-1 me-1'><Login/></div>
                                                </div>

    return (
        <div className='Header row h-100'>
            <div className='col-8'>
                {toastElement}
            </div>
            <div className='col-4 d-flex justify-content-end'>
                {rightCorner}
            </div>
        </div>
    )
}