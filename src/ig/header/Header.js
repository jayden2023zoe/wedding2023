
import React, { useEffect, useState } from 'react';
import './Header.scss';
import Avatar from './Avatar'
import { DataContext } from '../../Context/DataContext.js';
import jaydenZoeBack from './jayden__zoe.png';
const moment = require('moment');

function Header(props) {
  const [now, setNow] = useState(moment())
  const { rwd, globalData, globalDataDispatch, registorDispatch, globalFunction, modalConfig, modalConfigDispatch } = React.useContext(DataContext)
  let info = globalData.info;
  useEffect(() => {
    updateSecond(() => {
      setNow(moment())
    })

  }, []);

  const openForm = () => {
    if (globalData.isSendSuccess || globalFunction.getIsSuccess()) {
      globalDataDispatch({ ...globalData, isSendSuccess: false })
      globalFunction.setIsSuccess(false)
      registorDispatch(globalFunction.initRegistor())
    }
    modalConfigDispatch({ ...modalConfig, openForm: true })
  }
  return (
    <>
      <div className={`Header ${rwd.rwdMode}`}>
        <div className={`photo-area ${rwd.rwdMode}`}>
          <div className={`photo-frame ${rwd.rwdMode}`}>
            <Avatar tag="Main" />
          </div>
        </div>
        <div className={`info-area ${rwd.rwdMode}`}>
          <div className={`row hide-${rwd.rwdMode} account`}>
            <div className='account-title'>
              <div className="account-outer">
                <div className="account-outer-back" style={{ backgroundImage: `url('${jaydenZoeBack}')` }}></div>
                <div className="account-outer-text">{`🤵 👰`}</div>
              </div>
            </div>
            {/* {`Jayden🤵 👰Zoe`} */}
            {/* <div className='regist-btn' onClick={openForm}>
              點我報名  ⏰倒數
              <div className="regist-date">{`${globalFunction.caculateCountDown(now, moment(globalData.endRegistorDate), "day")} Days`}</div>
              <div className="regist-time">{`${globalFunction.caculateCountDown(now, moment(globalData.endRegistorDate), "time")}`}</div>
            </div> */}
          </div>
          <div className={`row hide-${rwd.rwdMode}`}>
            <div className={`count-item ${rwd.rwdMode}`}>{`${info.albums.length}貼文`}</div>
            <div className={`count-item ${rwd.rwdMode}`}>{`${globalFunction.caculateCountDown(now, moment(globalData.targetDate), "day")} Days`}</div>
            <div className={`count-item ${rwd.rwdMode}`}>{`${globalFunction.caculateCountDown(now, moment(globalData.targetDate), "time")}`}</div>
          </div>
          <div className={`row hide-${rwd.rwdMode} bio`} dangerouslySetInnerHTML={{ __html: info.info.bio }}></div>
          <div className={`row hide-${rwd.rwdMode} bio`}>
            <div className='regist-btn' onClick={openForm}>
              點我報名  ⏰倒數
              <div className="regist-date">{`${globalFunction.caculateCountDown(now, moment(globalData.endRegistorDate), "day")} Days`}</div>
              <div className="regist-time">{`${globalFunction.caculateCountDown(now, moment(globalData.endRegistorDate), "time")}`}</div>
            </div>
          </div>
          <div className={`row hide-${rwd.rwdMode}`}>{globalFunction.gen20230916()}</div>
          <div className={`row show-${rwd.rwdMode}`}>
            <div className="count-item">
              <div className="number">{info.albums.length}</div>
              <div className="title">貼文</div>
            </div>
            <div className="count-item">
              <div className="number">{globalFunction.caculateCountDown(now, moment(globalData.targetDate), "day")}</div>
              <div className="title">Days</div>
            </div>
            <div className="count-item">
              <div className="number">{globalFunction.caculateCountDown(now, moment(globalData.targetDate), "time")}</div>
              {/* <div className="title">Time</div> */}
            </div>
          </div>
        </div>
      </div>
      <div className={`mobile-bio ${rwd.rwdMode}`}>
        <div className={`row`}>
          <div className='account-title'>
            <div className="account-outer">
              <div className="account-outer-back" style={{ backgroundImage: `url('${jaydenZoeBack}')` }}></div>
              <div className="account-outer-text">{`🤵 👰`}</div>
            </div>
          </div></div>
        <div className={`row bio`} dangerouslySetInnerHTML={{ __html: info.info.bio }}></div>
        <div className={`row`}>
          <div className='regist-btn' onClick={openForm}>
            點我報名  ⏰倒數
            <div className="regist-date">{`${globalFunction.caculateCountDown(now, moment(globalData.endRegistorDate), "day")} Days`}</div>
            <div className="regist-time">{`${globalFunction.caculateCountDown(now, moment(globalData.endRegistorDate), "time")}`}</div>
          </div>
        </div>
        <div className={`row`}>{globalFunction.gen20230916()}</div>
      </div>
    </>
  );
}

const importAllImages = (r) => {
  // console.log({ r: r.keys() })
  return r.keys().map(r);
}

const padStart2WithZero = (value) => {
  return value.toString().padStart(2, "0")
}

const updateSecond = (fn) => {
  fn()
  setTimeout(() => {
    updateSecond(fn)
  }, 1000)
}

const updateImage = (fn) => {
  fn()
  setTimeout(() => {
    updateImage(fn)
  }, 3000)
}

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}


const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export default Header;
