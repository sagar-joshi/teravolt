import { useState } from "react";
import { ax } from "../utils/axios.config";

export function InputArea(props){
    const [text, setText] = useState("");
    const handleChange = (e) => {
        setText(e.target.value);
    };
    const handleSend = () => {
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
    };
    return (
        <div className="InputArea d-flex flex-row h-100 ms-2 me-2">
            <input className="w-100 border" type="text" placeholder="Enter text here" value={text} onChange={handleChange}/>
            <button className="btn border" onClick={handleSend}>Send</button>
        </div>
    );
}