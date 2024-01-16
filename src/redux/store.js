import dialogsRedux from './dialogs-redux';
import profileRedux from './profile-redux';
import sidebarRedux from './sidebar-redux';

let store = {
    //данные для постов и сообщений
    _state: {
        // посты
        profilePage: {
            posts: [
                {id: "1", post:"Hello", like:"3"},
                {id: "2", post:"I like game", like:"1"},
                {id: "3", post:"Helloo? World!", like:"7"},
                {id: "4", post:"Programs", like:"30"}
            ],
            newPost: "Java Script"
        },
        // сообщения
        dialogsPage: {
            friends: [
                {name:"Andrey", id:"1"},
                {name:"Dima", id:"2"},
                {name:"Max", id:"3"},
                {name:"Feda", id:"4"},
                {name:"Tom", id:"5"}
            ],
            messages: [
                {message:"Hi"},
                {message:"How are things?"},
                {message:"GOOD"}
            ]
        },
        sidebar: {}
    },

    getState() {
        return this._state;
    },

    _renderEntireTree() {}, //создаем функцию для отриовки страницы
    
    //функция для добавления постов
    addPost() {
        let newPost = {id: "5", post:this._state.profilePage.newPost, like:"0"};
        this._state.profilePage.posts.push(newPost);

        this._renderEntireTree(this._state);
        this._state.profilePage.newPost = '';
    },

    //функция для изменения информации в textarea
    updateInfo(text) {
        this._state.profilePage.newPost = text;
        this._renderEntireTree(this._state);
    },

    //функция для получения callbac-функции обрисовки страницы
    subscribe(observe) {
        this._renderEntireTree = observe;
    },

    //объединяем все функции в одну
    dispatch(action) {
        this._state.profilePage = profileRedux(this._state.profilePage, action);
        this._state.dialogsPage = dialogsRedux(this._state.dialogsPage, action);
        this._state.sidebar = sidebarRedux(this._state.sidebar, action);
        this._renderEntireTree(this._state);
    }
}

export default store;