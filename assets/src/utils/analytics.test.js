import { trackAnalyticsPageView, trackEvent } from './analytics';

describe('analytics', () => {
  beforeEach(() => {
    window.ga = jest.fn();
  });

  describe('trackAnalyticsPageView', () => {
    it('send data related to the current page to GA', () => {
      trackAnalyticsPageView({
        location: {
          pathname: 'http://kamu/bh',
          search: '?query=p',
        },
      });

      expect(window.ga).toHaveBeenCalledWith('set', 'page', 'http://kamu/bh?query=p');
      expect(window.ga).toHaveBeenCalledWith('send', 'pageview');
    });
  });

  describe('trackEvent', () => {
    it('send event data to GA', () => {
      trackEvent('Preferences', 'Toggle Theme', 'Dark');

      expect(window.ga).toHaveBeenCalledWith('send', 'event', 'Preferences', 'Toggle Theme', 'Dark');
    });
  });
});
