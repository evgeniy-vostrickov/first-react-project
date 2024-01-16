import React from 'react'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { Input } from '../common/FormsControls/FormsControls';
import { maxLengthCreator, required } from '../utils/validators/validators';
import { loginUserThunk } from '../../redux/auth_reducer'
import { Redirect } from 'react-router';

const maxLength40 = maxLengthCreator(40);

//деструктуризация => заменяем props на handleSubmit и error
const LoginForm = ({handleSubmit, error}) => {
    return (
        <form action="" onSubmit={handleSubmit}>
            <div>
                <Field placeholder="Логи" component={Input} name="email" validate={[required, maxLength40]} />
            </div>
            <div>
                <Field placeholder="Пароль" component={Input} name="password" validate={[required]} />
            </div>
            <div>
                <Field type="checkbox" component="input" name="rememberMe" /> remember me
            </div>
            {error && <div>{error}</div>}
            <div>
                <button>Выполнить</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm) //login - передаем форме название

const Login = ({loginUserThunk, isAuth}) => {
    const onSubmit = (formData) => {
        // console.log(formData);
        loginUserThunk(formData.email, formData.password, formData.rememberMe);
    }
    if (isAuth)
        return <Redirect to={"/profile"}/>
    
    return (
        <div>
            <h2>Login</h2>
             <LoginReduxForm onSubmit={onSubmit}/> {/* onSubmit - данные из формы содержит */}
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {loginUserThunk})(Login);