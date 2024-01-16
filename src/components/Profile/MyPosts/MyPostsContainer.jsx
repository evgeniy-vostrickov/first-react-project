import MyPosts from './MyPosts'
import {actions} from '../../../redux/profile-reducer'
import { connect } from 'react-redux';


// const MyPostsContainer = (props) => {
//     let state = props.store.getState();

//     let addPost = () => {
//         props.store.dispatch(addPostActionCreator());
//     }

//     let updateInfo = (text) => {
//         props.store.dispatch(updateInfoActionCreator(text));
//     }
    
//     return (
//         <MyPosts addPost={addPost} updateInfo={updateInfo} posts={state.profilePage.posts} newPostText={state.profilePage.newPost} />
//     );
// }

const mapStateToProps = (state) => {
    return{
        posts: state.profilePage.posts, //Компонента MyPosts перерисовывается, когда массив posts изменяется
        newPostText: state.profilePage.newPost
    }
}

const mapDispatchProps = (dispatch) => {
    return{
        addPost: () => {dispatch(actions.addPostActionCreator())},
        updateInfo: (text) => {dispatch(actions.updateInfoActionCreator(text))}
    }
}

// const MyPostsContainer = connect(mapStateToProps, mapDispatchProps)(MyPosts);
// export default MyPostsContainer;

export default connect(mapStateToProps, mapDispatchProps)(MyPosts);