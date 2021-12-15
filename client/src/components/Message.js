export function Message(props){
    const msgInnerDiv = `text-start d-inline-block m-2 p-1 border rounded ${props.self?"border-primary":"border-dark"}`;
    return (
        <div className={props.self?"text-end":"text-start"}>
            <div className={msgInnerDiv}>
                <div className="msgSender fw-light fs-small d-inline-block text-success">
                    <span>{props.senderName}</span>
                </div>
                <div className="msgText">
                    <span>{props.msg}</span>
                </div>
            </div>
        </div>
    );
}