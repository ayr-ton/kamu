import parse from 'url-parse';

export const isWaitlistFeatureActive = () => {
  const { query } = parse(window.location.href, true);
  return 'waitlist' in query && query.waitlist === 'active';
};

export default {
  isWaitlistFeatureActive,
};
