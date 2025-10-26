
import { normalizeUnits } from 'moment';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import './Post.scss';
import PhotoSwiper from './PhotoSwiper'
import Avatar from '../header/Avatar'
import { DataContext } from '../../Context/DataContext.js';

function Post(props) {
  const { globalData, modalConfig, modalConfigDispatch } = React.useContext(DataContext)
  console.log({ modalConfig })
  console.log({ albums: globalData.info.albums })
  // const [photos, setPhotos] = useState(modalConfig.index > 0 ? globalData.info.albums[modalConfig.index].photos : globalData.info.albums[0].photos)
  const [currentAlbum, setCurrentAlbum] = useState(modalConfig.index > 0 ? globalData.info.albums[modalConfig.index] : globalData.info.albums[0])
  let index = modalConfig.index
  return (
    <div className="post" onClick={() => { modalConfigDispatch({ index: -1 }) }}>
      <div className='post-control'>
        {index > 0 ? <div className='post-control-btn' onClick={(event) => { adjustIndex(event, index - 1, modalConfigDispatch, globalData.info.albums, setCurrentAlbum) }}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </div> : <div className='post-control-btn transparent'></div>}
      </div>
      <div className='post-content' onClick={(event) => { event.stopPropagation() }}>
        <div className='post-photo' >
          <PhotoSwiper photos={currentAlbum.photos} />
          {/* <div className='post-photo-slick'>
            
          </div> */}
          {/* style={{ backgroundImage: `url('${props.albums[0].url}')` }} */}

        </div>
        <div className='post-comment'>
          <div className='post-row title'>
            <div className='post-comment-title-frame'>
              <Avatar tag="Main"/>
            </div>
            <div className='post-title-content'>
              <div className='post-title-text'>{getAccountName()}</div>
              <div className='post-title-location'>{currentAlbum.location}</div>
              {/* <div className='post-title-icon'><FontAwesomeIcon icon={faEllipsis} /></div> */}
            </div>
          </div>
          {currentAlbum.says.map((say,k) => {
            return <div key={k} className='post-row comment'>
              <div className='post-comment-frame'>
                <Avatar tag={say.user} />
              </div>
              <div className='post-comment-content' dangerouslySetInnerHTML={{ __html: say.say }}></div>
              <div className='post-comment-tag'>{say.tags}</div>
            </div>
          })}
        </div>
      </div>
      <div className='post-control'>
        {props.albums.length - 1 > index ? <div className='post-control-btn' onClick={(event) => { adjustIndex(event, index + 1, modalConfigDispatch, globalData.info.albums, setCurrentAlbum) }}>
          <FontAwesomeIcon icon={faAngleRight} />
        </div> : <div className='post-control-btn transparent'></div>}
      </div>
    </div>
  );
}

const adjustIndex = function (event, index, modalConfigDispatch, albums, setCurrentAlbum) {
  modalConfigDispatch({ index: index });
  setCurrentAlbum(albums[index]);

  event.stopPropagation();
}

const getAccountName = function () {
  return `Jayden 🤵 👰 Zoe`
}

export default Post;
