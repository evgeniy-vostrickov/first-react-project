import Dialogs from './Dialogs'
import {sendMessageCreator, updateNewMessage} from '../../redux/dialogs-reducer'
import { connect } from 'react-redux';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import { compose } from 'redux';

const mapStateToProps = (state) => {
    return{
        dialogsPage: state.dialogsPage
    }
}

const mapDispatchProps = (dispatch) => {
    return{
        sendMessage: (newMessage) => {dispatch(sendMessageCreator(newMessage))},
        updateNewMessage: (text) => {dispatch(updateNewMessage(text))}
    }
}

export default compose(connect(mapStateToProps, mapDispatchProps), withAuthRedirect)(Dialogs) //compose делает композицию: в кучу складывает все обработчики чего-либо

// let AuthRedirectComponent = withAuthRedirect(Dialogs); //хук, который возвращает компоненты и добавляет проверку на то что залогинни пользователь или нет
// const DialogsContainer = connect(mapStateToProps, mapDispatchProps)(AuthRedirectComponent);
// export default DialogsContainer;

