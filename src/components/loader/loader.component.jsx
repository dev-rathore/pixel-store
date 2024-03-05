import React from 'react';

import './loader.styles.scss';

const Loader = ({
  size = "medium",
}) => {
  return (
    <div className={`loader-${size}`} />
  );
};

export default Loader;