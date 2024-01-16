import React from 'react';
import Post from './Post/Post'

//React.memo - нужен для того чтобы постоянно не перерисовывать компоненту, когда перерисовывается родительская компонента. ЕСЛИ только не изменились props или state
const MyPosts = React.memo((props) => {
    let posts_jsx = props.posts.map(element => <Post message={element.post} like={element.like}/>);

    let newPostElement = React.createRef();

    let onAddPost = () => {
        // props.dispatch(addPostActionCreator());
        props.addPost();
    }

    let updateNewPostText = () => {
        let text = newPostElement.current.value;
        props.updateInfo(text);
    }
    
    return (
        <div>
            <h2>My posts</h2>
            <textarea name="news" id="" cols="30" rows="10" ref={newPostElement} onChange={updateNewPostText} value={props.newPostText}></textarea>
            <button onClick={onAddPost}>Send</button>

            {posts_jsx}
        </div>
    );
});

export default MyPosts;