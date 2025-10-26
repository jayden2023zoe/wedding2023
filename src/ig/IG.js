
import React, { useEffect, useState } from 'react';
import './IG.scss';
import Header from './header/Header'
import FixHeader from './header/FixHeader'
import Main from './main/Main'
import Posts from './mobile/Posts'
import MobileForm from './form/MobileForm'
import outerLine from '../assets/utils/t.png';
import backgroundRight from '../assets/utils/s.png';
import { useLocation, useParams } from 'react-router-dom';
import { DataReducer } from '../Reducer/DataReducer.js';
import { FunctionReducer } from '../Reducer/FunctionReducer.js';
import { ModalConfigReducer } from '../Reducer/ModalConfigReducer.js';
import { RegistorProducer } from '../Reducer/RegistorProducer.js';
import { RwdReducer } from '../Reducer/RwdReducer.js';
import { globalFN } from './globalFN.js';
import { DataContext } from '../Context/DataContext.js';
// import axios from 'axios';
// import { v4 as uuidv4 } from 'uuid';
// import { TRUE } from 'node-sass';

const moment = require('moment');

function IG(props) {
  const { search } = useLocation(); // 获取 URL 中的查询参数
  // let { mode } = useParams();
  const mode = new URLSearchParams(search).get('q'); // 解析查询参数
  const mainSetting = globalFN.getInfo(mode)
  const formSetting = globalFN.getForm()
  const [globalData, globalDataDispatch] = React.useReducer(DataReducer, {
    // rwdMode: "web",
    targetDate: mainSetting.targetDate,
    endRegistorDate: mainSetting.endRegistorDate,
    info: mainSetting,
    form: formSetting,
    isSendSuccess: globalFN.getIsSuccess(),
    // about: generateAbout()
  });

  const [modalConfig, modalConfigDispatch] = React.useReducer(ModalConfigReducer, {
    index: -1,
    openForm: false
  })

  const [registor, registorDispatch] = React.useReducer(RegistorProducer, globalFN.initRegistor(formSetting))
  const [rwd, rwdDispatch] = React.useReducer(RwdReducer, { rwdMode: "web" })

  const [globalFunction, globalFunctionDispatch] = React.useReducer(FunctionReducer, globalFN)
  return (
    <>
      <DataContext.Provider value={{
        globalData, globalDataDispatch,
        modalConfig, modalConfigDispatch,
        registor, registorDispatch,
        rwd, rwdDispatch,
        globalFunction
      }}>
        <div className="IG">
          <div className={`content ${rwd.rwdMode}`}>
            <FixHeader />
            <Header mode={mode} />
            <Main mode={mode} />
          </div>
          {modalConfig.index > -1 && <div className="mobile-posts">
            <Posts />
          </div>}
          {modalConfig.openForm && <div className="mobile-form-frame">
            <MobileForm />
          </div>}
        </div>
      </DataContext.Provider>
    </>
  );
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

const generateAbout = () => {
  return <div className="about">
    <div>那一天我們在彼此的心裡，種下了名為愛情的種子</div>
    <div>我們用行動灌溉，用包容施肥</div>
    <div>如今名為"婚禮"的花苞即將綻開</div>
    <div>劼德 & 仲伶誠心地邀請最重要的你(妳)，來參加婚禮！</div>
    <div>婚禮那天的幸福感是平常的99倍哦</div>
  </div>
}
export default IG;
