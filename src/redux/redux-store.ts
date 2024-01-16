import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import dialogsRedux from "./dialogs-reducer";
import profileRedux from "./profile-reducer";
import sidebarRedux from "./sidebar-reducer";
import usersRedux from "./users-reducer";
import authRedux from "./auth_reducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import appRedux from "./app-reducer";

let reducers = combineReducers({
    //данные для постов и сообщений : редьюсоры
    profilePage: profileRedux,
    dialogsPage: dialogsRedux,
    sidebar: sidebarRedux,
    usersPage: usersRedux,
    auth: authRedux, //это уже не страница, а аутентификация поэтому Page опускаем
    form: formReducer,
    app: appRedux
});

//ReturnType - Создает тип, состоящий из возвращаемого типа функции Type.
export type AppStateType = ReturnType<typeof reducers>;

// extends - расширяет параметр T, т.е. принимает только парамтры {[key: string]: infer U}
// Ключевое слово infer позволяет вам вывести тип из другого типа внутри условного типа.
type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never;
export type InferActionsType<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>;

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
// let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;