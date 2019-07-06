import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import 'styles/css-transition.scss';

const ToastMask = ({ show }) => {
  return show ? <div className="cy-mask" /> : <></>;
};

const ToastContent = ({ msg }) => {
  return msg ? <p className="cy-toast-content">{msg}</p> : <></>;
};

const Toast = ({ msg, showMask = false }) => {
  return (
    <CSSTransition
      in={true}
      timeout={1500}
      classNames="fade"
      unmountOnExit
      appear={true}
    >
      <>
        <ToastMask show={showMask} />
        <ToastContent msg={msg} />
      </>
    </CSSTransition>
  );
};

const createToast = (msg, duration = 1.5, showMask = false) => {
  const div = document.createElement('div');
  div.className = 'cy-toast-wrapper';
  document.body.appendChild(div);
  ReactDOM.render(<Toast msg={msg} showMask={showMask} />, div);

  if (duration > 0) {
    setTimeout(() => {
      document.body.removeChild(div);
    }, duration * 1000);
  }
};

export default createToast;
