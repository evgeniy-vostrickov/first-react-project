import { ThunkAction } from "redux-thunk";
import { authUserThunk } from "./auth_reducer";
import { AppStateType, InferActionsType } from "./redux-store";

const INITIALIZED_SUCCESS = 'initialized_success';

export type InitialState = {
    initialized: boolean
}

let initialState: InitialState = {
    initialized: false
}

const appRedux = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return { ...state, initialized: true }

        default:
            return state;
    }
}

export default appRedux;


export const actions = {
    initializedSuccess: () => ({ type: INITIALIZED_SUCCESS }),
}

type ActionsTypes = InferActionsType<typeof actions>;

//Санки(thunk)
//в санку можно передавать и state в виде getState, например: return (dispatch, getState) => {

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>

export const initializeAppThunk = (): ThunkType => {
    return (dispatch) => {
        dispatch(authUserThunk()).then(() => {
            dispatch(actions.initializedSuccess());
        }
        );
    }
}