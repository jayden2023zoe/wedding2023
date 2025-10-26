
import React, { useEffect, useState } from 'react';
import { DataContext } from '../../../Context/DataContext.js';
import mapPhoto from './R20230916/map.png';
import logoPhoto from './R20230916/logo.png';
import busPhoto from './R20230916/bus.png';
import waysPhoto from './R20230916/ways.png';
import './RestaurantTaipei.scss';

function Avatar(props) {
  const { globalData } = React.useContext(DataContext)
  let defaultAvatar = globalData.info.avatars[0]
  if (props.tag) {
    defaultAvatar = globalData.info.avatars.find(avatar => {
      return avatar.key.indexOf(props.tag) > -1
    })
  }
  return (
    <div className='restaurant'>
      <a href="https://www.88mov5f.com/index.php" target="_blank"><img className="photo " src={logoPhoto} /></a>
      <img className="photo " src={mapPhoto} />
      <img className="photo " src={waysPhoto} />
      <img className="photo " src={busPhoto} />
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.2262019904715!2d121.57259957616682!3d25.060321237229854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ab2415b5aa0d%3A0x6674fcc98a69ba07!2zODjomZ_mqILnq6A!5e0!3m2!1szh-TW!2stw!4v1689767603023!5m2!1szh-TW!2stw" width="100%" height="450" style={{"border":0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"> </iframe>
    </div>
  );
}

export default Avatar;
