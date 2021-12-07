import {Message} from './Message.js';

export function MessageArea(props){
    const messages = props.msgList.map((item, index) => {
        return(
            <div key={index}>
                <Message self={item.self} senderName={item.name} msg={item.msg}/>
            </div>
        )
    })
    return (
        <div>
            {messages}
        </div>
    );
}