export const pxToVW = px => {
  const len =
    (px / (document.body.clientWidth * window.devicePixelRatio)) * 100;
  return `${len.toFixed(3)}vw`;
};

// export default { pxToVW };
