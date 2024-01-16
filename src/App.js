import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, Switch } from 'react-router-dom';
// import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initializeAppThunk } from "./redux/app-reducer";
import Preloader from './components/common/Preloader/Preloader';
import { Redirect } from 'react-router';

//Ленивая загрузка. Нужна в те моменты, когда мы хотим, чтобы все страницы не подгружались сразу, а поступляли по мере надобности.
const DialogsContainer = React.lazy(() => import ('./components/Dialogs/DialogsContainer'));


class App extends React.Component {
  componentDidMount() {
    this.props.initializeAppThunk();
  }

  render() {
    if (!this.props.initialized){
      return <Preloader />
    }
    return (
        <div id="wrapper">
          <HeaderContainer />

          <div className="dis_block">
            <Navbar />

            <div className="content">
              {/* Switch - нужен для того чтобы React проходил по роутам и при первом совпадении выводил страницу */}
              <Switch>
                <Route exact path="/" render={() => <Redirect to={"/profile"} />} />  {/* exact - точное совпадение */}
                <Route path="/profile/:userId?" render={() => <ProfileContainer />} />  {/* : - означает что в userId мы получим ID пользователя из адресной страки; ? - означает, что параметр не обязателен */}
                {/* React.Suspense - говорит, что мы будем подгружать по мере надобности. fallback - что мы показываем пока идет загрузка */}
                <Route path="/dialogs" render={() => {
                  return <React.Suspense fallback={<Preloader />}> 
                    <DialogsContainer />
                  </React.Suspense>
                }} />
                <Route path="/users" render={() => <UsersContainer />} />
                <Route path="/login" render={() => <Login />} />
                <Route path="*" render={() => <div>404  NOT FOUND</div>} />
              </Switch>
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized
  }
}

export default compose(connect(mapStateToProps, { initializeAppThunk }))(App)
//когда коннектим компоненту сбивается роутинг, поэтому нужно писать withRouter