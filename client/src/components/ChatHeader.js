import "./ChatHeader.css"

export function ChatHeader(props){
    return (
        <div className="chatHeader">
            {props.groupName}
        </div>
    )
}