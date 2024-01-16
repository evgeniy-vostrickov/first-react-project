import React, { useEffect } from 'react'
import { connect } from "react-redux"
import Profile from "./Profile"
import { setUserProfileThunk, getStatusUserThunk, setStatusUserThunk, savePhotoThunk } from "../../redux/profile-reducer"
import { withRouter } from 'react-router'
import { compose } from 'redux'


const ProfileContainer = (props) => {
    // const [userId, setUserId] = useState(props.match.params.userId);

    useEffect(() => {
        let userId = props.match.params.userId;
        
        if (!userId) {
            userId = props.authorizedUserId; //по умолчанию берем id 2, а вообще должен быть свой id (19627)
            
            if (!props.isAuth)
                props.history.push('/login'); //редирект на страничку login
        }

        props.setUserProfileThunk(userId);
        props.getStatusUserThunk(userId);
        // return () => {
        //     cleanup
        // }
    }, [props.match.params.userId])

    return (
        <section>
            <Profile {...props} isOwner = {!props.match.params.userId} /> {/* !!!важно!!! все props мы прокидываем дальше которые пришли к нам в App.js + мы прокидываем profile из mapStateToProps */}
        </section>
    );
}

//для элементов из state
const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.id,
        isAuth: state.auth.isAuth
    }
}

export default compose(connect(mapStateToProps, { setUserProfileThunk, getStatusUserThunk, setStatusUserThunk, savePhotoThunk }), withRouter)(ProfileContainer) ////compose делает композицию: в кучу складывает все обработчики чего-либо

// let AuthRedirectComponent = withAuthRedirect(ProfileContainer); //хук, который возвращает компоненты и добавляет проверку на то что залогинни пользователь или нет

// export default connect(mapStateToProps, { setUserProfileThunk })(withRouter(AuthRedirectComponent))
// // connect возвращает новую компоненту с mapStateToProps, т.е. со state и mapDispatchToProps, т.е. с dispatch
// // withRouter необходим для получения/работы с URL страницы


