
import { normalizeUnits } from 'moment';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-solid-svg-icons'
import './Album.scss';
import { DataContext } from '../../Context/DataContext.js';

function Album(props) {
  const { globalData, modalConfig, modalConfigDispatch } = React.useContext(DataContext)
  const [photos, setPhotos] = useState(modalConfig.index > 0 ? globalData.info.albums[modalConfig.index].photos : globalData.info.albums[0].photos)
  let index = modalConfig.index
  let albumFrame = props.albumFrame
  let albums = globalData.info.albums
  let rowsObj = [];
  for (let i = 0; i < albumFrame.rows; i++) {
    rowsObj = [...rowsObj, i]
  }
  let columnsObj = [];
  for (let i = 0; i < albumFrame.columns; i++) {
    columnsObj = [...columnsObj, i]
  }
  return (
    <>{albumFrame.rows > 1 || albumFrame.columns > 1 ?
      <>{albumFrame.albums.length == 1 ?
        <div className="album-frame" style={{ backgroundImage: `url('${albums[albumFrame.albums[0]].url}')` }}>
          {albums[albumFrame.albums[0]].textUrl && <div className="album-frame-cover" style={{ backgroundImage: `url('${albums[albumFrame.albums[0]].textUrl}')` }}></div>}
          {rowsObj.map((row, k) => {
            return <div key={k} className='album-row'>
              {columnsObj.map((column, i) => {
                return < div key={i} className='album' onClick={() => { props.openPost(albumFrame.albums[0], albums) }}>
                  <div className='album-back'>
                    {/* {`${album.photos.length}`} */}
                    <div className="album-back-icon">
                      {albums[albumFrame.albums[0]].photos.length > 1 && <FontAwesomeIcon icon={faImages} />}
                    </div>
                  </div>
                  <div className='album-cover'>
                    <div className='album-cover-back'></div>
                    <div className='album-cover-content' dangerouslySetInnerHTML={{ __html: albums[albumFrame.albums[0]].message }}></div>
                  </div>
                </div>
              })}
            </div>
          })}
        </div> :
        <div className="album-frame">
          {rowsObj.map((row, k) => {
            return <div key={k} className='album-row'>
              {columnsObj.map((column, i) => {
                return < div key={i} className='album' onClick={() => { props.openPost(albumFrame.albums[k + i], albums) }}>
                  <div className='album-back' style={{ backgroundImage: `url('${albums[albumFrame.albums[k + i]].url}')` }}>
                    {/* {`${album.photos.length}`} */}
                    <div className="album-back-icon">
                      {albums[albumFrame.albums[k + i]].photos.length > 1 && <FontAwesomeIcon icon={faImages} />}
                    </div>
                    {albums[albumFrame.albums[k + i]].textUrl && <div className="album-frame-cover" style={{ backgroundImage: `url('${albums[albumFrame.albums[k + i]].textUrl}')` }}></div>}
                  </div>
                  <div className='album-cover'>
                    <div className='album-cover-back'></div>
                    <div className='album-cover-content' dangerouslySetInnerHTML={{ __html: albums[albumFrame.albums[k + i]].message }}></div>
                  </div>
                </div>
              })}
            </div>
          })}
        </div>
      }</>
      :
      <div className={`album-frame`}>
        <div className='album' onClick={() => { props.openPost(albumFrame.albums[0], albums) }}>
          <div className='album-back' style={{ backgroundImage: `url('${albums[albumFrame.albums[0]].url}')` }}>
            {/* {`${album.photos.length}`} */}
            <div className="album-back-icon">
              {albums[albumFrame.albums[0]].photos.length > 1 && <FontAwesomeIcon icon={faImages} />}
            </div>
            {albums[albumFrame.albums[0]].textUrl && <div className="album-frame-cover" style={{ backgroundImage: `url('${albums[albumFrame.albums[0]].textUrl}')` }}></div>}
          </div>
          <div className='album-cover'>
            <div className='album-cover-back'></div>
            <div className='album-cover-content' dangerouslySetInnerHTML={{ __html: albums[albumFrame.albums[0]].message }}></div>
          </div>
        </div>
      </div>
    }
    </>
  );
}

export default Album;
