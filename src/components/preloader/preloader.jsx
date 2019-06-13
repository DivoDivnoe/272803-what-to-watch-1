import React from 'react';

const Preloader = () => {
  return (
    <div
      className="player__preloader"
      style={{position: `absolute`, left: `50%`, top: `50%`, transform: `translate(-50%, -50%)`}}
    >
      <img src="/img/preloader.gif" width="50" height="50" alt="preload" />
    </div>
  );
};

export default Preloader;
