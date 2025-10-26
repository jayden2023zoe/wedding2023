import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Web from './Web';
import IG from './ig/IG';
import Mobile from './Mobile';

function App() {
  useEffect(() => {
    // window.addEventListener('resize', handleRWD);
    // handleRWD(); //加入此行
    // return (() => {
    //   window.removeEventListener('resize', handleRWD);
    // })
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/:mode" element={<IG />} />
        <Route path="*" element={<IG />} />
        {/* <Route path="/m" element={<Mobile mode={window.location.pathname} />} />
        <Route path="/" element={<Web mode={window.location.pathname} />} />
        <Route path="*" element={<Web mode={window.location.pathname} />} /> */}
      </Routes>
    </Router>
  );
}

const handleRWD = () => {
  let path = "/"
  if (window.location.pathname.length > 1) {
    path = "/m"
  }
  console.log({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    result: window.innerHeight / window.innerWidth,
    path: path
  })
  if (window.innerHeight / window.innerWidth < 1.5 && path != "/") {
    window.location.replace("/");
  }
  else if (window.innerHeight / window.innerWidth > 1.5 && path != "/m") {
    window.location.replace("/m");
  }
}

export default App;
