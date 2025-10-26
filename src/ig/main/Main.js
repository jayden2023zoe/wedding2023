
import { normalizeUnits } from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-solid-svg-icons'
import './Main.scss';
import Post from './Post'
import Album from './Album'
import RestaurantTaipei from './restaurant/RestaurantTaipei'
import Form from '../form/Form'
import { DataContext } from '../../Context/DataContext.js';
import PostPhotoSelected from './asset/IG-P-B.png'
import PostPhoto from './asset/IG-P-G.png'
import VideoPhotoSelected from './asset/IG-VIDEO-B.png'
import VideoPhoto from './asset/IG-VIDEO-G.png'
import LocationPhotoSelected from './asset/IG-LOCATION-B.png'
import LocationPhoto from './asset/IG-LOCATION-G.png'

const moment = require('moment');

function Main(props) {
  const { rwd, rwdDispatch, globalData, globalDataDispatch, modalConfig, modalConfigDispatch, globalFunction } = React.useContext(DataContext)
  const [post, setPost] = useState(null)

  const openPost = function (index, albums) {
    setPost(<Post index={index} albums={albums} closeModal={() => { }} />);
    modalConfigDispatch({ index: index })
  }

  useEffect(() => {
    globalFunction.getUserData();
    window.addEventListener('resize', () => { globalFunction.handleRWD(rwd, rwdDispatch) });
    globalFunction.handleRWD(rwd, rwdDispatch); //加入此行
    return (() => {
      window.removeEventListener('resize', () => { globalFunction.handleRWD(rwd, rwdDispatch) });
    })
  }, [rwd]);


  // const handleRWD = useCallback((globalData, globalDataDispatch) => {
  //   let rwdMode = "mobile"
  //   if ((window.innerHeight / window.innerWidth) < (12 / 9) && window.innerWidth > 450) {
  //     rwdMode = "web"
  //   }
  //   console.log({ instanceGlobalData: globalData })
  //   if (rwdMode != globalData.rwdMode) {
  //     let instanceGlobalData = JSON.parse(JSON.stringify(globalData))
  //     instanceGlobalData.rwdMode = rwdMode
  //     globalDataDispatch(instanceGlobalData)
  //   }
  //   let htmlElement = document.querySelector('html');
  //   let mainElement = document.querySelector('.main');
  //   document.documentElement.style.setProperty('--main-width', `${(mainElement.offsetWidth < htmlElement.offsetWidth) ? mainElement.offsetWidth : htmlElement.offsetWidth}px`);
  //   // console.log({ htmlElement: htmlElement.offsetWidth })
  //   // console.log({ mainElement: mainElement.offsetWidth })
  // },[globalData])
  // console.log({ info: globalData })
  return (
    <>
      <div className={`main  ${rwd.rwdMode}`}>
        <div className={`tabs ${rwd.rwdMode}`}>
          <div className={`tab ${!props.mode || props.mode === "posts" ? "selected" : ""}`} onClick={() => {
            window.location.replace("?q=posts")
          }}>貼文</div>
          <div className={`tab ${props.mode === "reels" ? "selected" : ""}`} onClick={() => {
            window.location.replace("?q=reels")
          }}>Reels</div>
          <div className={`tab ${props.mode === "restaurant" ? "selected" : ""}`} onClick={() => {
            window.location.replace("?q=restaurant")
          }}>餐廳</div>
        </div>
        <div className='tab-content'>
          <div className='albums'>
            <div className={`mobile-tabs ${rwd.rwdMode}`}>
              <div className={`tab ${!props.mode || props.mode === "posts" ? "selected" : ""}`}
                style={{ backgroundImage: `url('${!props.mode || props.mode === "posts" ? PostPhotoSelected : PostPhoto}')` }}
                onClick={() => {
                  window.location.replace("?q=posts")
                }}></div>
              <div className={`tab ${props.mode === "reels" ? "selected" : ""}`}
                style={{ backgroundImage: `url('${!props.mode || props.mode === "reels" ? VideoPhotoSelected : VideoPhoto}')` }}
                onClick={() => {
                  window.location.replace("?q=reels")
                }}></div>
              <div className={`tab ${props.mode === "restaurant" ? "selected" : ""}`}
                style={{ backgroundImage: `url('${!props.mode || props.mode === "reels" ? LocationPhotoSelected : LocationPhoto}')` }}
                onClick={() => {
                  window.location.replace("?q=restaurant")
                }}></div>
            </div>
            {/* {globalData.info.albums.map((album, k) => {
            return <Album key={k} index={k} album={album} openPost={openPost} />
          })} */}
            {props.mode === "restaurant" && <RestaurantTaipei />}
            {props.mode != "restaurant" && globalData.info.albumFrames.map((albumFrame, k) => {
              return <Album key={k} albumFrame={albumFrame} openPost={openPost} />
            })}
          </div>
        </div>
        <Modal
          isOpen={modalConfig.index > -1 && rwd.rwdMode != "mobile"}
          // onAfterOpen={afterOpenModal}
          onRequestClose={(() => modalConfigDispatch({ index: -1 }))}
          ariaHideApp={false}
          style={getCustomStyles()}
        >
          {post}
        </Modal>
        <Modal
          isOpen={modalConfig.openForm && rwd.rwdMode != "mobile"}
          // onAfterOpen={afterOpenModal}
          onRequestClose={(() => modalConfigDispatch({ index: -1 }))}
          ariaHideApp={false}
          style={getCustomStyles()}
        >
          {<Form />}
        </Modal>
        <div id="end"></div>
      </div >
    </>
  );
}

const getCustomStyles = function () {
  return {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
      zIndex: 3,
    },
    content: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'transparent',
      WebkitOverflowScrolling: 'touch',
      outline: 'transparent',
      border: 'none',
      padding: 0
    }
  };
}

export default Main;
