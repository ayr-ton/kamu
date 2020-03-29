import React from 'react';
import PropTypes from 'prop-types';

import './ErrorMessage.css';

export default function ErrorMessage({ title, subtitle }) {
  return (
    <div className="error-message" data-testid="error-message">
      <img src="/static/images/logo.svg" alt="Kamu logo" className="error-message__logo" />
      <h1 className="error-message__title">
        {title}
      </h1>
      <p className="error-message__description">
        {subtitle}
      </p>
    </div>
  );
}

ErrorMessage.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};
