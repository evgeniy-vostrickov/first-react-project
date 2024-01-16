import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'

const Profile = (props) => {
    return (
        <section>
            <ProfileInfo profile = {props.profile} status = {props.status} setStatusUserThunk = {props.setStatusUserThunk} isOwner = {props.isOwner} savePhotoThunk = {props.savePhotoThunk} />
            <MyPostsContainer />
        </section>
    );
}

export default Profile;