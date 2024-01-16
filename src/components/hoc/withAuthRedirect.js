import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

const mapStateToPropsForRedirect = (state) => {
    return{
        isAuth: state.auth.isAuth
    }
}

export const withAuthRedirect = (Comment) => {
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Redirect to={"/login"} />;
            return <Comment {...this.props} />
        }
    }

    const ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect, {})(RedirectComponent);

    return ConnectedAuthRedirectComponent;
}