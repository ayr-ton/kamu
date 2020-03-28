import React from 'react';

export default function ErrorMessage() {
  return (
    <div className="error-boundary" data-testid="error-message">
      <img src="/static/images/logo.svg" alt="Kamu logo" className="error-boundary__logo" />
      <h1 className="error-boundary__title">
        Something went wrong.
      </h1>
      <p className="error-boundary__description">
        An error happened while loading this page. Please try again.
      </p>
    </div>
  );
}
