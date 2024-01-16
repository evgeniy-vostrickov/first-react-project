import React from 'react';
import "../../App.css"
import Friend from './Friends/Friend'
import Message from './Messages/Message'

const Dialogs = (props) => {
    let friendsElements = props.dialogsPage.friends.map(element => <Friend name={element.name} id={element.id} key={element.id} />);
    let messagesElements = props.dialogsPage.messages.map(element => <Message message={element.message} key={element.id} />);
    let newMessage = props.dialogsPage.newMessage;


    let newMessageElement = (e) => {
        props.updateNewMessage(e.target.value);
    };

    let addMessage = (newMessage) => {
        props.sendMessage(newMessage);
    }
    
    // if (!props.isAuth) return <Redirect to={"/login"} />;

    return (
        <div className="dis_block">
            <div>
                <div>DIALOGS</div>
                {friendsElements}
            </div>
            <div className="content">
                {messagesElements}
                <textarea name="message" id="" cols="30" rows="3" onChange={newMessageElement} placeholder="Enter your message" value={newMessage}></textarea>
                <button onClick={addMessage}>Send</button>
            </div>
        </div>
    );
}

export default Dialogs;