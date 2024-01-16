import { NavLink } from 'react-router-dom';

//добавить logout logoutUserThunk

const Header = (props) => {
    return (
        <header className="">
            <img src="https://nporeklama.ru/assets/images/foto/fasad/flogo.png" alt="" />
            {props.isAuth ? 
                <div>{props.login} - <button onClick={() => props.logoutUserThunk(props.login)}>Logout</button></div> 
                : 
                <NavLink to={'/login'}>Login</NavLink>
            }
        </header>
    );
}

export default Header;