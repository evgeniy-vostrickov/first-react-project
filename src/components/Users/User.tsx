import React from 'react'
import styles from './Users.module.css'
import userPhoto from '../../assets/images/icon.png'
import { UserType } from '../../types/types'

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    followThunk: (id: number) => void
    unfollowThunk: (id: number) => void
}

const User: React.FC<PropsType> = ({user, followingInProgress, followThunk, unfollowThunk}) => {
    return (
        <div key={user.id}>
            <span>
                <a href={'/profile/' + user.id}>
                    <img src={user.photos.small != null ? user.photos.small : userPhoto} alt="Аватарка" className={styles.avatar} />
                </a>
                <div>
                    {user.followed ?
                        <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            unfollowThunk(user.id);
                        }}>Unfollow</button> :
                        <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            followThunk(user.id);
                        }}>Follow</button>}
                </div>
            </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                <span>
                    <div>{"user.location.country"}</div>
                    <div>{"user.location.city"}</div>
                </span>
            </span>
        </div>
    )
}

export default User;