import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import state, { subscribe } from './redux/state';
// import {addPost} from './redux/state';
// import {updateInfo} from './redux/state';
import store from './redux/redux-store';
import { Provider } from 'react-redux';

// let renderEntireTree = (state) => {
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store} > {/* Сохраняем store в контексте, чтобы не пробрасывать его на каждом уровне, а обратиться когда это необходимо */}
        <App />
      </Provider>
    </BrowserRouter>
    {/* bind нужен потому что мы в данных функциях используем ключевое слово this, а оно должно срабатывать именно для объекта store */}
  </React.StrictMode>,
  document.getElementById('root')
);
// } //функция для рисования самой страницы

// store.subscribe( () => {
//   let state = store.getState();
//   renderEntireTree(state); //передаем в функцию state, т.к. в redux не предусмотрено это
// }); //передаем в state.js функцию renderEntireTree через функцию subscribe чтобы избежать зацикливания

// store.subscribe(renderEntireTree);

// renderEntireTree(store.getState()); //вызываем функцию рисования страницы


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
