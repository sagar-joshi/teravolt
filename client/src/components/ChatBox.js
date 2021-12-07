import { ChatHeader } from "./ChatHeader.js";
import { MessageArea } from "./MessageArea.js";
import { InputArea } from "./InputArea.js";

export function ChatBox(props){
    return (
        <div>
        <ChatHeader groupName="First Group"/>
        <MessageArea msgList={[
        {name: "Tom", msg:"Hi, there", self:false},
        {name: "Jerry", msg:"Hi, Whats up!", self:true}, 
        {name: "Bob", msg:"Do you have an extra pen", self:false}, 
        {name: "Jerry", msg:"Yeah, take it!", self:true}]}/>
        <InputArea/>
        </div>
    );
}