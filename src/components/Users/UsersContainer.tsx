import React from 'react'
import Users from './Users'
import {getUsersThunk, followThunk, unfollowThunk} from '../../redux/users-reducer'
import { connect } from 'react-redux'
import Preloader from '../common/Preloader/Preloader'
import { getCurrentPage, getFollowingInProgress, getIsFetting, getPageSize, getPortionSize, getTotalUsersCount, getUsers } from '../../redux/users-selectors'
import { UserType } from '../../types/types'
import { AppStateType } from '../../redux/redux-store'

type MapStatePropsType = {
    users: Array<UserType>
    followingInProgress: Array<number>
    totalUsersCount: number
    pageSize: number
    portionSize: number
    currentPage: number
    isFetting: boolean
}

type MapDispatchPropsType = {
    followThunk: (id: number) => void
    unfollowThunk: (id: number) => void
    getUsersThunk: (currentPage: number, pageSize: number) => void
}

//Внешние props которые приходят от вызываемого компонента
type OwnPropsType = {}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUsersThunk(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (page: number) => {
        this.props.getUsersThunk(page, this.props.pageSize);
    }

    render() {
        return (
            <>
                {this.props.isFetting ? <Preloader /> : null}
                <Users currentPage = {this.props.currentPage} totalUsersCount = {this.props.totalUsersCount} pageSize = {this.props.pageSize} portionSize = {this.props.portionSize} followingInProgress = {this.props.followingInProgress} users = {this.props.users} onPageChanged = {this.onPageChanged} followThunk = {this.props.followThunk} unfollowThunk = {this.props.unfollowThunk} />
            </>
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return{
        users: getUsers(state),
        pageSize: getPageSize(state),
        portionSize: getPortionSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetting: getIsFetting(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

/*const mapStateToProps = (state) => {
    return{
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetting: state.usersPage.isFetting,
        followingInProgress: state.usersPage.followingInProgress,
    }
}*/

/*const mapDispatchProps = (dispatch) => {
    return{
        follow: (user_id) => {dispatch(followAC(user_id))},
        unfollow: (user_id) => {dispatch(unfollowAC(user_id))},
        setUsers: (users) => {dispatch(setUsersAC(users))},
        setTotalUsersCount: (count) => {dispatch(setTotalUsersCountAC(count))},
        setCurrentPage: (page) => {dispatch(setCurrentPageAC(page))},
        toggleIsFetching: (isFetting) => {dispatch(toggleIsFetchingAC(isFetting))}
    }
}*/

// const UsersContainer = connect(mapStateToProps, mapDispatchProps)(Users);
// export default UsersContainer;

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, { getUsersThunk, followThunk, unfollowThunk})(UsersContainer);