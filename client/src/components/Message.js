import "./Message.css";

export function Message(props){
    return (
        <div className={props.self?"msgSelf":"msgOthers"}>
            <div className="msgInnerDiv">
                <div className="msgSender">
                    <span>{props.senderName}</span>
                </div>
                <div className="msgText">
                    <span>{props.msg}</span>
                </div>
            </div>
        </div>
    );
}