import React from 'react';
import Lottie from 'react-lottie';
import { withRouter } from 'react-router-dom';
import lottieData from '../assets/lottie_404.json';

const options = {
  loop: true,
  autoplay: true,
  animationData: lottieData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

function NoMatch({ location }) {
  // console.warn(location, history);
  return (
    <div>
      <Lottie
        options={options}
        height={'100%'}
        width={'auto'}
        isStopped={false}
        isPaused={false}
      />
      <h3 className="center c999">
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

export default withRouter(NoMatch);
