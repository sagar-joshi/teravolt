import { useState } from "react";

import './InputArea.css';

export function InputArea(props){
    const [text, setText] = useState("");
    const handleChange = (e) => {
        setText(e.target.value);
    };
    const handleSend = () => {
        console.log("Send clicked");
    };
    return (
        <div className="inputArea">
            <input className="inputBox" type="text" placeholder="Enter text here" value={text} onChange={handleChange}/>
            <button onClick={handleSend}>Send</button>
        </div>
    );
}