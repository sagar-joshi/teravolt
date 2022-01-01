import { useState } from "react";
import { ax } from "../utils/axios.config";
import { MdSend } from 'react-icons/md';
import { IconContext } from "react-icons/lib";
import './InputArea.css';

export function InputArea(props){
    const [text, setText] = useState("");
    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleSend = () => {
        props.focusInput();
        if(props.forAuthenticatedUsers){
            ax.post('/message/send', {
                text: text,
                receiverId: props.groupId
            })
            .then((res)=>{
                props.socket.emit("msg:new", {msgId: res.data.insertId});
                setText('');
            })
            .catch((err)=>{
                console.log(err);
            })
        }else{
            props.socket.emit("msg:new:noSave", {groupId: props.groupId, nickName: props.nickName, text: text});
            setText('');
        }
    };
    const handleKeyPress = (e) => {
        if(e.code === "Enter"){
            handleSend();
        }
    }
    return (
        <IconContext.Provider value={{size:"2rem", color:"blue"}}>
        <div className="InputArea d-flex flex-row h-100 ps-2 pe-2">
            <input id="text-inp"
            className="inputArea w-90 border border-2 rounded-pill" type="text" placeholder="Enter text here" autoFocus="autofocus"
            value={text} onChange={handleChange} onKeyPress={handleKeyPress}/>
            <button className="btn w-10 p-0 d-flex justify-content-center align-items-center" onClick={handleSend}><MdSend className="zoom-on-hover"/></button>
        </div>
        </IconContext.Provider>
    );
}