
import React, { useEffect, useState } from 'react';
import './Post.scss';
import Avatar from '../header/Avatar'
import PhotoSwiper from './PhotoSwiper'
import { DataContext } from '../../Context/DataContext.js';

function Posts(props) {
  const { globalData } = React.useContext(DataContext)
  return (
    <div className='posts-post'>
      <div className="anchor" id={`post${props.index}`}></div>
      <div className='post-header'>
        <div className='post-avatar-frame'>
          <Avatar tag="Main" />
        </div>
        <div className='post-text'>
          <div className='post-text-name'>Jayden 🤵👰 Zoe</div>
          <div className='post-text-location'>{props.album.location}</div>
        </div>
      </div>
      <div className='post-content'><PhotoSwiper photos={props.album.photos} /></div>
      {props.album.says.length > 0 && <div className='post-comments'>
        {props.album.says.map((say,k) => {
          return <div key={k} className='post-comment'>
            <div className='post-comment-title-frame'>
              <Avatar tag={say.user}/>
            </div>
            <div className='post-comment-content' dangerouslySetInnerHTML={{ __html: say.say }}></div>
            <div className='post-comment-tag'>{say.tags}</div>
          </div>
        })}

      </div>}
    </div>
  );
}


export default Posts;
