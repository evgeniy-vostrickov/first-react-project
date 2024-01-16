import React from 'react'
import { connect } from "react-redux"
import Header from "./Header"
import { authUserThunk, logoutUserThunk } from "../../redux/auth_reducer"



class HeaderContainer extends React.Component {

    componentDidMount() {
        this.props.authUserThunk();
    }

    render() {
        return (
            <section>
                <Header {...this.props} />
            </section>
        );
    }
}

//для элементов из state
const mapStateToProps = (state) => {
    return {
        login: state.auth.login,
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, { authUserThunk, logoutUserThunk })(HeaderContainer)