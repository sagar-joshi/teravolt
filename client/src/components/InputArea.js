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
            setText('');
            props.updateMsgList();
        })
        .catch((err)=>{
            console.log(err);
        })
    };
    return (
        <div className="InputArea d-flex h-100">
            <input className="w-100" type="text" placeholder="Enter text here" value={text} onChange={handleChange}/>
            <button onClick={handleSend}>Send</button>
        </div>
    );
}