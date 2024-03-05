import React from 'react';

import './loader.styles.scss';
import Loader from './loader.component';

const LoaderContainer = () => {
  return (
    <div className="loader-container">
      <Loader size="medium" />
    </div>
  );
};

export default LoaderContainer;