import { createSelector } from "reselect"
import { AppStateType } from "./redux-store";

export const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users
}

//reselect применяется для сложных селекторов
export const getUsers = createSelector(getUsersSelector, (users) => {
    //помимо getUsersSelector можно передвать и другие маленькие селекторы, например getPageSize, только тогда надо добавлять что мы просматриваем в state, например pageSize
    //любая сложная логика
    return users.filter(u => true);
})

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}
export const getPortionSize = (state: AppStateType) => {
    return state.usersPage.portionSize
}
export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}
export const getIsFetting = (state: AppStateType) => {
    return state.usersPage.isFetting
}
export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress
}