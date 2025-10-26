import logo from './logo.svg';
import './Mobile.scss';

function Mobile(props) {
  return (
    <div className="Mobile">
      <div className="video">{props.mode}</div> 
    </div>
  );
}

export default Mobile;
