
import React, { useEffect, useState, createRef } from 'react';
import './Form.scss';
import { DataContext } from '../../Context/DataContext.js';
import Cover from './asset/form-cover.JPG'
import BG from './asset/formBG.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faMap } from '@fortawesome/free-solid-svg-icons'
import OurAbout from './OurAbout'
import { globalFN } from '../globalFN.js';
import axios from 'axios';

function Form(props) {
  const { globalData, globalDataDispatch, modalConfig, modalConfigDispatch, registor, registorDispatch, globalFunction } = React.useContext(DataContext)
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)

  let refMap = {}
  globalData.form.forEach(element => {
    refMap[element.key] = createRef(null)
  });

  useEffect(() => {
    if (isSent) {
      globalFunction.checkRequired(globalData, globalDataDispatch, registor);
    }
  }, [registor]);
  const keyUp = (event) => {
    console.log(event.target.value)
    console.log(event.target.getAttribute("data-key"))

    registorDispatch({ ...registor, [event.target.getAttribute("data-key")]: event.target.value })
  }

  useEffect(() => {
    globalFN.updateForm(globalData, globalDataDispatch, registor)
  }, [registor]);
  const sendRegister = () => {
    setIsSending(true);
    setIsSent(true);
    let checkResult = globalFunction.checkRequired(globalData, globalDataDispatch, registor)
    // console.log({checkResult})
    if (!checkResult) {
      let now = globalFunction.now('YYYY-MM-DD HH:mm:ss')
      globalFunction.sendRegister(registor, globalFunction.getUserData, now, refMap).then(
        () => {
          setIsSending(false);
          globalDataDispatch({ ...globalData, isSendSuccess: true })
          globalFunction.setIsSuccess(true)
          console.log("報名成功")
        }
      ).catch(error => {
        // 錯誤回應處理
        setIsSending(false);
      });
    }
    else {
      scrollToAnchor(`key${checkResult}`)
      setIsSending(false);
    }
  }

  const scrollToAnchor = function (anchorName) {
    if (anchorName) {
      // 找到錨點
      let anchorElement = document.getElementById(anchorName);
      // 如果對應id的錨點存在，就跳轉到錨點
      if (anchorElement) { anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' }); }
    }
  }

  return (
    <div className='form'>
      <div className="close" onClick={() => { modalConfigDispatch({ ...modalConfig, openForm: false }) }}><FontAwesomeIcon icon={faXmark} /></div>
      <div className="form-frame" style={{ backgroundImage: `url("${BG}")` }}>
        <div className='form-content'>
          <div className="cover" style={{ backgroundImage: `url('${Cover}')` }}>
            <div className='cover-bio'>
              <div className='cover-bio-text'></div>
              <div className='cover-bio-background'></div>
            </div>
          </div>
          <div className="items">
            <OurAbout />
            <div className="form-item">
              <div className={`title`}>日期</div>
              <div className="value"><b>2023/09/16(六)</b> <div>入席 中午12:00  開席 中午12:30</div></div>
            </div>
            <div className="form-item">
              <div className={`title`}>地點</div>
              <div className="value"><b>88樂章婚宴會館</b>
                <div>114台北市內湖區民善街88號5樓 <a href="https://goo.gl/maps/ry4cKGuaGh4zm7ys9" target="_blank"><FontAwesomeIcon icon={faMap} /></a>
                </div>
              </div>
            </div>
            {globalData.form.map((item, k) => {
              return <div key={k} className="form-item">
                {item.type === "textarea" ? <textarea className={`${item.isTip ? "tip" : ""}`} data-key={item.key} placeholder={item.placeHolder} defaultValue={registor[item.key]} onKeyUp={keyUp} ref={refMap[item.key]}/> :
                  <>
                    <div id={`key${item.key}`} className={`title ${item.required ? "required" : ""}`}>{item.title}</div>
                    <div className="value">
                      {item.type === "text" && <input tpye="text" className={`${item.isTip ? "tip" : ""}`} data-key={item.key} defaultValue={registor[item.key]} onKeyUp={keyUp} ref={refMap[item.key]}/>}
                      {item.type === "select" && <select className={`${item.isTip ? "tip" : ""}`} data-key={item.key} defaultValue={registor[item.key]} onChange={keyUp} ref={refMap[item.key]}>
                        <option></option>
                        {item.options.map((option, optionKey) => {
                          return <option key={optionKey} value={option}>{option}</option>
                        })}
                      </select>}
                      {item.type === "select_no_empty" && <select className={`${item.isTip ? "tip" : ""}`} data-key={item.key} defaultValue={registor[item.key]} onChange={keyUp} ref={refMap[item.key]}>
                        {item.options.map((option, optionKey) => {
                          return <option key={optionKey} value={option}>{option}</option>
                        })}
                      </select>}
                      {/* {item.type === "textarea" && <textarea data-key={item.key} defaultValue={registor[item.key]} onKeyUp={keyUp} />} */}
                    </div>
                  </>
                }
              </div>
            })}
            <div className="form-item">
              {isSending ? <div className="btn">幸福電波正在發送中~</div> :
                <div className="btn" onClick={sendRegister}>發送報名</div>}
            </div>
          </div>
        </div>
        <div className={`success-mask ${globalData.isSendSuccess && "show"}`}>
          <div className="success-mask-background"></div>
          <div className="success-mask-content">
            <div className="success-info">
              <div className='title'>{`報名成功 期待2023/09/16相會`}</div>
              <div>{globalFunction.gen20230916()}</div>
            </div>
          </div>
        </div>
        <div className='form-background'></div>
      </div>
    </div>
  );
}


export default Form;
