import { useState } from "react";

export function InputArea(props){
    const [text, setText] = useState("");
    const handleChange = (e) => {
        setText(e.target.value);
    };
    const handleSend = () => {
        console.log("Send clicked");
    };
    return (
        <div className="InputArea d-flex h-100">
            <input className="w-100" type="text" placeholder="Enter text here" value={text} onChange={handleChange}/>
            <button onClick={handleSend}>Send</button>
        </div>
    );
}