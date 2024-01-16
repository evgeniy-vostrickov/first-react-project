import React from 'react'
import Pagination from '../common/Pagination/Pagination'
import User from './User'
import { UserType } from '../../types/types'

type PropsType = {
    users: Array<UserType>
    followingInProgress: Array<number>
    totalUsersCount: number
    pageSize: number
    portionSize: number
    currentPage: number
    followThunk: (id: number) => void
    unfollowThunk: (id: number) => void
    onPageChanged: (page: number) => void
}

const Users: React.FC<PropsType> = (props) => {

    return (
        <div>
            <Pagination totalUsersCount={props.totalUsersCount} pageSize={props.pageSize} currentPage={props.currentPage} onPageChanged={props.onPageChanged} portionSize={props.portionSize} />
            <div>
                {
                    props.users.map(user =>
                        <User user={user} followingInProgress={props.followingInProgress} followThunk={props.followThunk} unfollowThunk={props.unfollowThunk} key={user.id}/>
                    )
                }
            </div>
        </div>
    );
}

export default Users;