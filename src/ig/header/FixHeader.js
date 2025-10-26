
import { useEffect, useState } from 'react';
import './FixHeader.scss';
import weddinGram from './weddinGram.png';
import date20230916 from './weddingram-2023-09-16.png';
import GLoginBtn from '../GLoginBtn'
const moment = require('moment');

function FixHeader(props) {
  return (
    <div className='fix-header'>
      <div className='fix-header-content'>
        <div className='title' style={{backgroundImage:`url('${weddinGram}')`}}></div>
        <div className='wedding-date' style={{backgroundImage:`url('${date20230916}')`}}></div>
        {/* <div className=''>登入</div> */}
        {/* <GLoginBtn />  */}
      </div>
    </div>
  );
}
export default FixHeader;
