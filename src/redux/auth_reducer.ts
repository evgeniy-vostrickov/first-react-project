import { ThunkAction } from "redux-thunk";
import { authAPI, ResultCodesEnum } from "../api/api";
import { Nullable } from "../types/types";
import { AppStateType, InferActionsType } from "./redux-store";

const SET_USER_DATA = 'setAuthUserData';

// 1 способ задания типа
// export type InitialState = {
//     id: number | null
//     login: string | null
//     email: string | null
//     isAuth: boolean
// }

let initialState = {
    id: null as Nullable<number>,
    login: null as Nullable<string>,
    email: null as Nullable<string>,
    isAuth: false
}

type InitialState = typeof initialState

const authRedux = (state = initialState, action: ActionsType): InitialState => {
    switch (action.type) {
        case SET_USER_DATA:
            return { ...state, ...action.payload }

        default:
            return state;
    }
}

export default authRedux;


export const actions = {
    setAuthUserData: (id: number | null, login: string | null, email: string | null, isAuth: boolean) => ({ type: SET_USER_DATA, payload: { id, login, email, isAuth } } as const),
}

type ActionsType = InferActionsType<typeof actions>;


//Санки(thunk)

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>
type ThunkPromiseType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const authUserThunk = (): ThunkPromiseType => (dispatch) => {
    return authAPI.authUser()
        .then(data => {
            if (data.resultCode === ResultCodesEnum.Success) {
                let { id, login, email } = data.data;
                dispatch(actions.setAuthUserData(id, login, email, true));
            }
        }
        );
}

export const loginUserThunk = (email: string, password: string, rememberMe: boolean): ThunkType => {
    return (dispatch) => {
        authAPI.login(email, password, rememberMe)
            .then(data => {
                if (data.resultCode === ResultCodesEnum.Success) {
                    dispatch(authUserThunk());
                }
                else {
                    // let message = data.messages.length > 0 ? data.messages[0] : "Some error!";
                    // dispatch(stopSubmit("login", { _error: message }));
                }
            }
            );
    }
}

export const logoutUserThunk = (login: string): ThunkType => {
    return (dispatch) => {
        authAPI.logout()
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(actions.setAuthUserData(null, null, null, false));
                }
            }
            );
    }
}