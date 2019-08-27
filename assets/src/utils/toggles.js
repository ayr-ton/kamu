import parse from 'url-parse';

// eslint-disable-next-line import/prefer-default-export
export const isWaitlistFeatureActive = () => {
  const { query } = parse(window.location.href, true);
  return 'waitlist' in query && query.waitlist === 'active';
};
