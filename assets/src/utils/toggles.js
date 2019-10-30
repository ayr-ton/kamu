import parse from 'url-parse';

export const isToggleOn = (toggle) => {
  const isActive = (value) => value === 'on';
  const toggleKey = `toggle-${toggle}`;
  const { query } = parse(window.location.href, true);
  if (toggle in query) {
    localStorage.setItem(toggleKey, query[toggle]);
  }
  return isActive(localStorage.getItem(toggleKey));
};

export const isWaitlistFeatureActive = () => isToggleOn('waitlist');

export default {
  isToggleOn,
  isWaitlistFeatureActive,
};
