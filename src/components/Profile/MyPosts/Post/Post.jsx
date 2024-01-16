import p from './Post.module.css'
import profile from '../../Profile.module.css'

const Post = (props) => {
    return (
        <article className={profile["dis-block-left"]}>
            <img src="http://uksrechica.by/images/banners/imgwopros.png" alt="" />
            <p>{props.message}</p>
            <span>like {props.like}</span>
        </article>
    );
}

export default Post;