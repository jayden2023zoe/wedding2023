
import React, { useEffect, useState } from 'react';
import './Posts.scss';
import Post from './Post'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { DataContext } from '../../Context/DataContext.js';

function Posts(props) {
  const { rwd, globalData, modalConfig, modalConfigDispatch } = React.useContext(DataContext)
  useEffect(() => {
    scrollToAnchor(`post${modalConfig.index}`)
  }, []);
  return (
    <div className={`posts ${rwd.rwdMode}`}>
      <div className="posts-header" onClick={() => { modalConfigDispatch({ index: -1 }) }}>
        <div className="back-button"><FontAwesomeIcon icon={faArrowLeft} /></div><div className="posts-header-text">貼文</div>
      </div>
      <div className="posts-contnet">
        {globalData.info.albums.map((album, index) => {
          return <Post key={index} index={index} album={album} />
        })}
      </div>
    </div>
  );
}

const scrollToAnchor = function (anchorName) {
  if (anchorName) {
    // 找到錨點
    let anchorElement = document.getElementById(anchorName);
    // 如果對應id的錨點存在，就跳轉到錨點
    if (anchorElement) { anchorElement.scrollIntoView({ block: 'start' }); }
  }
}


export default Posts;
