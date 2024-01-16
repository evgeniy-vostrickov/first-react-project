import { ThunkAction } from "redux-thunk";
import { profileAPI } from "../api/api";
import { PhotosType, PostType, ProfileType } from "../types/types";
import { AppStateType, InferActionsType } from "./redux-store";

const ADD_POST = 'addPost';
const UPDATE_INFO = 'updateInfo';
const SET_USER_PROFILE = 'setUserProfile';
const SET_STATUS_USER = 'setStatusUser';
const SAVE_PHOTO = 'savePhoto';

// 1 способ задания типа
// export type InitialState = {
//     posts: Array<PostType>
//     newPost: string
//     profile: ProfileType | null
//     status: string
// }

let initialState = {
    posts: [
        { id: 1, post: "Hello", like: 3 },
        { id: 2, post: "I like game", like: 1 },
        { id: 3, post: "Helloo? World!", like: 7 },
        { id: 4, post: "Programs", like: 30 }
    ] as Array<PostType>,
    newPost: "",
    profile: null as ProfileType | null,
    status: ""
}

type InitialState = typeof initialState

const profileRedux = (state = initialState, action: ActionsType): InitialState => {
    //let stateCopy = {...state}; //создаем копию объекта, так как react работает только с чистыми функциями (data1 -> result1; data2 -> result2)
    switch (action.type) {
        case ADD_POST:
            let newPost = { id: 5, post: action.newPostText, like: 0 };
            return { ...state, posts: [...state.posts, newPost], newPost: '' };
        // stateCopy.posts = [...state.posts]; //создаем в объектк state копию объекта posts (до этого там была ссылка)
        // stateCopy.posts.push(newPost); //помещаем в нашу копию новый элемент
        // stateCopy.newPost = '';
        // return stateCopy;

        case UPDATE_INFO:
            // stateCopy.newPost = action.text;
            return { ...state, newPost: action.text };

        case SET_USER_PROFILE:
            return { ...state, profile: action.profile };

        case SET_STATUS_USER:
            return { ...state, status: action.status};

        case SAVE_PHOTO:
            return { ...state, profile: {...state.profile, photos: action.photos} as ProfileType};

        default:
            return state;
    }
}

type ActionsType = InferActionsType<typeof actions>

export const actions = {
    addPostActionCreator: (newPostText: string) => ({ type: ADD_POST, newPostText } as const),
    updateInfoActionCreator: (text: string) => ({ type: UPDATE_INFO, text } as const),
    setUserProfileAction: (profile: ProfileType) => ({ type: SET_USER_PROFILE, profile } as const),
    setStatusUserAction: (status: string) => ({ type: SET_STATUS_USER, status } as const),
    savePhotoThunkSuccess: (photos: PhotosType) => ({ type: SAVE_PHOTO, photos } as const)
}

// type addPostActionCreatorType = {
//     type: typeof ADD_POST
//     newPostText: string
// }
// export const addPostActionCreator = (newPostText: string): addPostActionCreatorType => ({ type: ADD_POST, newPostText });
// type updateInfoActionCreatorType = {
//     type: typeof UPDATE_INFO
//     text: string
// }
// export const updateInfoActionCreator = (text: string): updateInfoActionCreatorType => ({ type: UPDATE_INFO, text });
// type setUserProfileActionType = {
//     type: typeof SET_USER_PROFILE
//     profile: ProfileType
// }
// export const setUserProfileAction = (profile: ProfileType): setUserProfileActionType => ({ type: SET_USER_PROFILE, profile });
// type setStatusUserActionType = {
//     type: typeof SET_STATUS_USER
//     status: string
// }
// export const setStatusUserAction = (status: string): setStatusUserActionType => ({ type: SET_STATUS_USER, status });
// type savePhotoThunkSuccessType = {
//     type: typeof SAVE_PHOTO
//     photos: PhotosType
// }
// export const savePhotoThunkSuccess = (photos: PhotosType): savePhotoThunkSuccessType => ({ type: SAVE_PHOTO, photos });

// в файл помещаются все redux элементы, что бы разгрузить dispatch



//Санки(thunk)

// type GetStateType = () => AppStateType
// type DispatchType = Dispatch<ActionsType>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>

export const setUserProfileThunk = (userId: number): ThunkType => {
    return async (dispatch) => {
        //уходим от колбэков к async/await
        
        // profileAPI.setUserProfile(userId)
        //     .then(data => {
        //         dispatch(setUserProfileAction(data));
        //     }
        //     );

        let data = await profileAPI.setUserProfile(userId);
        dispatch(actions.setUserProfileAction(data));
    }
}
export const getStatusUserThunk = (userId: number): ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.getStatusUser(userId)
        dispatch(actions.setStatusUserAction(data));
    }
}
export const setStatusUserThunk = (status: string): ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.setStatusUser(status)
        if (data.resultCode === 0) {
            dispatch(actions.setStatusUserAction(status));
        }
    }
}
export const savePhotoThunk = (file: any): ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.savePhoto(file)
        if (data.resultCode === 0) {
            dispatch(actions.savePhotoThunkSuccess(data.data.photos));
        }
    }
}

export default profileRedux;