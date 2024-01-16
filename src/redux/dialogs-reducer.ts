import { InferActionsType } from "./redux-store";

const SEND_MESSAGE = 'sendmessage';
const UPDATE_NEW_MESSAGE = 'updatenewmessage';

type FriendType = {
    id: number
    name: string
}
type MessagesType = {
    id: number
    message: string
}

export type InitialState = {
    friends: Array<FriendType>
    messages: Array<MessagesType>
    newMessage: string
}

let initialState = {
    friends: [
        {id:1, name:"Andrey"},
        {id:2, name:"Dima"},
        {id:3, name:"Max"},
        {id:4, name:"Feda"},
        {id:5, name:"Tom"}
    ],
    messages: [
        {id:1, message:"Hi"},
        {id:2, message:"How are things?"},
        {id:3, message:"GOOD"},
        {id:4, message:"Hello bro"},
        {id:5, message:"How time?"}
    ],
    newMessage: ''
};

const dialogsRedux = (state = initialState, action: ActionsType): InitialState => {
    switch(action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: action.newMessage}],
                newMessage: ''
            };
        
        case UPDATE_NEW_MESSAGE:
            return {
                ...state,
                newMessage: action.text
            };
            
        default:
            return state;
    }
}

export default dialogsRedux;

export const actions = {
    sendMessageCreator: (newMessage: string) => ({type: SEND_MESSAGE, newMessage} as const),
    updateNewMessage: (text: string) => ({type: UPDATE_NEW_MESSAGE, text: text} as const),
}

type ActionsType = InferActionsType<typeof actions>