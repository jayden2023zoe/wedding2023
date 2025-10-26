import { useRef, useEffect } from 'react';
import { register } from 'swiper/element/bundle';
import "swiper/css/bundle";
import './PhotoSwiper.scss'
import loading from '../../assets/loading.gif';
function PhotoSwiper(props) {
  const swiperElRef = useRef(null);
  register();
  useEffect(() => {
    // listen for Swiper events using addEventListener
    swiperElRef.current.addEventListener('progress', (e) => {
      const [swiper, progress] = e.detail;
      // console.log(progress);
    });

    swiperElRef.current.addEventListener('slidechange', (e) => {
      // console.log('slide changed');
      updateDotPosition(e);
    });

    swiperElRef.current.addEventListener('resize', (e) => {
      // console.log("swiper resize")
      updateDotPosition(e);
    });
    document.documentElement.style.setProperty('--swiper-theme-color', `#ffffff`);
    document.documentElement.style.setProperty('--swiper-pagination-bullet-inactive-color', `#ffffff`);
    document.documentElement.style.setProperty('--swiper-navigation-size', `20px`);
    // document.documentElement.style.setProperty('--swiper-pagination-bullet-horizontal-gap', `20px`);
  }, []);

  return (
    <swiper-container
      ref={swiperElRef}
      slides-per-view="auto"
      navigation="true"
      pagination="true"
      // loop="true"
    >
      {props.photos.map((photo, k) => {
        return <swiper-slide key={k}><img style={{backgroundImage:`url('${loading}')`}} src={photo.path} /></swiper-slide>
      })}
    </swiper-container>
  );
}

const updateDotPosition = function (e) {
  const [swiper, progress] = e.detail;
  let element = e.target.childNodes[swiper.activeIndex];
  if (element) {
    const rect = element.childNodes[0].getBoundingClientRect();
    let distanceToBottom = window.innerHeight - rect.bottom - 10;
    if (distanceToBottom < 0) {
      distanceToBottom = 8
    }

    document.documentElement.style.setProperty('--swiper-pagination-bottom', `${distanceToBottom}px`);
    // console.log('Slide Distance to bottom:', distanceToBottom);
  }
}

export default PhotoSwiper;