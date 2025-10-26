
import { useEffect, useState } from 'react';
import './Web.scss';
import outerLine from './assets/utils/t.png';
import backgroundRight from './assets/utils/s.png';
import { useLocation, useParams } from 'react-router-dom';
import Moment from 'react-moment';
const moment = require('moment');

function Web(props) {
  // const images = [a, b, c, d, e, f]
  const { search } = useLocation(); // 获取 URL 中的查询参数
  const mode = new URLSearchParams(search).get('mode'); // 解析查询参数
  const bothImages = importAllImages(require.context('./assets/album', false, /\.(png|jpe?g|svg)$/i))
  const jaydenImages = importAllImages(require.context('./assets/album', false, /\.(png|jpe?g|svg)$/i))
  const zoeImages = importAllImages(require.context('./assets/album', false, /\.(png|jpe?g|svg)$/i))
  let images = (mode === "bride") ? zoeImages : (mode === "groom") ? jaydenImages : bothImages;
  const [imageIndex, setImageIndex] = useState(getRandomInt(images.length))
  const targetDate = "2023-09-16 12:30" //"2023/10/28"
  console.log({ mode })
  const [now, setNow] = useState(moment())
  useEffect(() => {
    updateSecond(() => {
      setNow(moment())
    })

    updateImage(() => {
      setImageIndex(getRandomInt(images.length))
    })
  }, []);
  return (
    <div className="Web">
      <div className="background" style={{ backgroundImage: `url(${images[imageIndex]})` }}></div>
      <div className="background-right" style={{ backgroundImage: `url(${backgroundRight})` }}></div>
      <div className='section'>
        <div className="media">
          <div className="content" style={{ backgroundImage: `url(${images[imageIndex]})`, color: "red" }}></div>
          <div className="out-line" style={{ backgroundImage: `url(${outerLine})` }}></div>
        </div>
        <div className='content'>
          <div className='target-date'>{targetDate}</div>
          <div className='count-down'>
            {caculateCountDown(now, moment(targetDate))}
          </div>
          <div className="name-context">
            <div className={`name ${mode === "groom" ? "shake" : ""}`}>劼德</div>
            <div className={`happy ${mode != "groom" && mode != "bride" ? "shake" : ""}`}>囍</div>
            <div className={`name ${mode === "bride" ? "shake" : ""}`}>仲伶</div>
          </div>
        </div>
      </div>

    </div>
  );
}

const importAllImages = (r) => {
  console.log({ r: r.keys() })
  return r.keys().map(r);
}

const caculateCountDown = (start, end) => {
  const diff = moment.duration(end.diff(start));
  if (diff.asDays() > 0) {
    return `${Math.floor(diff.asDays())} Days ${padStart2WithZero(diff.hours())}:${padStart2WithZero(diff.minutes())}:${padStart2WithZero(diff.seconds())}`;
  }
  return `${diff.hours()}:${diff.minutes()}:${diff.seconds()}`;
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


const shuffle = (array)=>{
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
export default Web;
