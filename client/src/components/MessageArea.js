import {Message} from './Message.js';
import './MessageArea.css';

export function MessageArea(props){
    const messages = props.msgList.map((item, index) => {
        return(
            <div key={index}>
                <Message self={item.self} senderName={item.name} msg={item.msg}/>
            </div>
        )
    })
    return (
        // added key attribute in the below div because outer div(s) were not re-rendering
        // on msgList prop change, thus preventing the scrollbar to reach the bottom
        <div key={props.msgList} className='MessageArea h-100 d-flex flex-column-reverse'>
            <div className='ms-2'>
                {messages}
            </div>
        </div>
    );
}