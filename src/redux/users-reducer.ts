import { ThunkAction } from 'redux-thunk';
import { usersAPI } from '../api/api'
import { updateObjectInArray } from '../components/utils/object-helpers'
import { UserType } from '../types/types';
import { AppStateType, InferActionsType } from './redux-store';

const FOLLOW = 'follow';
const UNFOLLOW = 'unfollow';
const SET_USERS = 'setUsers';
const SET_TOTAL_USERS_COUNT = 'setTotalUsersCount';
const SET_CURRENT_PAGE = 'setCurrentPage';
const TOGGLE_IS_FETCHING = 'toggleIsFetching';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'toggleIsFollowingProgress'

type InitialState = {
    users: Array<UserType>
    totalUsersCount: number
    pageSize: number
    portionSize: number
    currentPage: number
    isFetting: boolean
    followingInProgress: Array<number>
}

let initialState: InitialState = {
    users: [],
    totalUsersCount: 0, //общее число пользователей
    pageSize: 10, //число пользователей на странице
    portionSize: 10, //количество страниц в paginations
    currentPage: 1, //текущая страница
    isFetting: false, //процесс загрузки
    followingInProgress: [] //массив, в котором находятся id пользователей, которых мы фоловим или анфоловим
}

const usersRedux = (state = initialState, action: ActionsType): InitialState => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                //выделим отдельный блок object-helpers где делаем изменение свойств
                users: updateObjectInArray(state.users, action.user_id, "id", {followed: true})
            }

        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.user_id, "id", {followed: false})
            }

        case SET_USERS: {
            return { ...state, users: action.users };
        }

        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalUsersCount: action.count };
        }

        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.page }
        }

        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetting: action.isFetting }
        }

        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return { ...state, followingInProgress: action.isFollowing ? [...state.followingInProgress, action.userId] : state.followingInProgress.filter(id => id != action.userId) }
        }

        default:
            return state;
    }
}

export default usersRedux;

export const actions = {
    followSucces: (user_id: number) => ({ type: FOLLOW, user_id } as const),
    unfollowSucces: (user_id: number) => ({ type: UNFOLLOW, user_id } as const),
    setUsers: (users: Array<UserType>) => ({ type: SET_USERS, users } as const),
    setTotalUsersCount: (count: number) => ({ type: SET_TOTAL_USERS_COUNT, count } as const),
    setCurrentPage: (page: number) => ({ type: SET_CURRENT_PAGE, page } as const),
    toggleIsFetching: (isFetting: boolean) => ({ type: TOGGLE_IS_FETCHING, isFetting } as const),
    toggleIsFollowingProgress: (isFollowing: boolean, userId: number) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFollowing, userId } as const),
}

type ActionsType = InferActionsType<typeof actions>



//Санки(thunk)

// type GetStateType = () => AppStateType
// type DispatchType = Dispatch<ActionsType>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>

export const getUsersThunk = (currentPage: number, pageSize: number): ThunkType => {
    return (dispatch, getState) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(currentPage));
        usersAPI.getUsers(currentPage, pageSize)
            .then(data => {
                dispatch(actions.toggleIsFetching(false));
                dispatch(actions.setUsers(data.items));
                dispatch(actions.setTotalUsersCount(data.totalCount));
            }
            );
    }
}

//followThunk и unfollowThunk можно объединить, сократив код

export const followThunk = (userId: number): ThunkType => {
    return (dispatch, getState) => {
        dispatch(actions.toggleIsFollowingProgress(true, userId));
        usersAPI.follow(userId)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(actions.followSucces(userId));
                }
                dispatch(actions.toggleIsFollowingProgress(false, userId));
            }
            );
    }
}

export const unfollowThunk = (userId: number): ThunkType => {
    return (dispatch, getState) => {
        dispatch(actions.toggleIsFollowingProgress(true, userId));
        usersAPI.unfollow(userId)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(actions.unfollowSucces(userId));
                }
                dispatch(actions.toggleIsFollowingProgress(false, userId));
            }
            );
    }
}

