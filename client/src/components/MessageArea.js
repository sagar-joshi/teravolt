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
        // overflow-y-scroll is not defined by default in bootstrap 
        // its defined in style.css and imported in App.js
        <div className='h-100 overflow-auto d-flex flex-column-reverse'>
            <div className='MessageArea'>
                {messages}
            </div>
        </div>
    );
}