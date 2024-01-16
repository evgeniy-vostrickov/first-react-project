import { NavLink } from 'react-router-dom';
import navbarStyle from './Navbar.module.css'

const Navbar = () => {
    return (
        <nav>
            <div><NavLink to="/profile" activeClassName={navbarStyle.active}>Profile</NavLink></div>
            <div><NavLink to="/dialogs" activeClassName={navbarStyle.active}>Message</NavLink></div>
            <div><NavLink to="/users" activeClassName={navbarStyle.active}>Users</NavLink></div>
            <div>News</div>
            <div>Music</div>
            <div>Settings</div>
        </nav>
    );
}

export default Navbar;

