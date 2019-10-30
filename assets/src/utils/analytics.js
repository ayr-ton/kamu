export const trackAnalyticsPageView = ({ location }) => {
  if (typeof window.ga === 'function') {
    window.ga('set', 'page', location.pathname + location.search);
    window.ga('send', 'pageview');
  }
};

export const trackEvent = (category, action, label) => {
  if (typeof window.ga === 'function') {
    window.ga('send', 'event', category, action, label);
  }
};

export default {
  trackEvent,
  trackAnalyticsPageView,
};
