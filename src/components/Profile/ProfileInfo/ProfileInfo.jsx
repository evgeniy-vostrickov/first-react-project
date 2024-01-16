import React from 'react'
import Preloader from '../../common/Preloader/Preloader';
import p from './ProfileInfo.module.css'
import ProfileStatusHook from './ProfileStatusHook';
import defaultUserPhoto from "../../../assets/images/default-avatar.jpg"

const ProfileInfo = (props) => {
  if (!props.profile)
    return <Preloader />

  return (
        <div>
            {/* <div>
                <img id={p.im1} src="https://puzzleit.ru/files/puzzles/227/227216/_original.jpg" alt="" />
            </div> */}
            
            <div className={p["dis-block-left"]}>
              <div>
                <img src={props.profile.photos.large || defaultUserPhoto} alt="" />
                { props.isOwner && <input type={"file"} onChange={(event) => props.savePhotoThunk(event.target.files[0])} /> }
                <ProfileStatusHook status={props.status} setStatusUserThunk = {props.setStatusUserThunk}/>
                {/* <img src="https://cs6.pikabu.ru/avatars/1855/v1855122-1635545411.jpg" alt="" /> */}
              </div>
              <div>
                <h2>Vostrickov</h2>
                <div>Date of Birth: 2 September</div>
                <div>City: Volgograd</div>
                <div>Education: BSU11</div>
                <div>Web Site: https://ru-ru.facebook.com/</div>
              </div>
            </div>
        </div>
    );
}

export default ProfileInfo;