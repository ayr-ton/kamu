export const trackAnalyticsPageView = ({ location }) => {
  if (typeof window.ga === 'function') {
    window.ga('set', 'page', location.pathname + location.search);
    window.ga('send', 'pageview');
  }
  return null;
};
