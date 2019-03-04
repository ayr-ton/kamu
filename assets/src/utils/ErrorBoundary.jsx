import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Sentry from '@sentry/browser';

import './ErrorBoundary.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
    Sentry.withScope((scope) => {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  }

  render() {
    return (this.state.hasError) ? (
      <div className="error-boundary">
        <img src="/static/images/logo.svg" alt="Kamu logo" className="error-boundary__logo" />
        <h1 className="error-boundary__title">
          Something went wrong.
        </h1>
        <p className="error-boundary__description">
          An error happened while loading this page. Please try again.
        </p>
      </div>
    ) : this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
