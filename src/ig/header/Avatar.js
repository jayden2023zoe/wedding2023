
import React, { useEffect, useState } from 'react';
import { DataContext } from '../../Context/DataContext.js';
import './Avatar.scss';

function Avatar(props) {
  const { globalData,rwd } = React.useContext(DataContext)
  let defaultAvatar = globalData.info.avatars[0]
  if (props.tag) {
    defaultAvatar = globalData.info.avatars.find(avatar => {
      return avatar.key.indexOf(props.tag) > -1
    })
  }
  return (
    <div className='avatar-area'>
      <div className='photo-circle'>
        {props.tag==="Main" && <div className='avatar-circle'></div>}
      </div>
      <div className='photo'>
        <div className={`avatar ${rwd.rwdMode} ${props.tag==="Main"?"":"no-circle"}`} style={{ backgroundImage: `url('${defaultAvatar.path}')` }}></div>
      </div>
    </div>
  );
}

export default Avatar;
