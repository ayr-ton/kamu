export const getRegion = () => localStorage.getItem('region');

export const setRegion = (region) => {
  localStorage.setItem('region', region);
};

export const clearRegion = () => {
  localStorage.removeItem('region');
};

export const getDefaultTheme = () => {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    return storedTheme;
  }

  const prefersDarkMatch = '(prefers-color-scheme: dark)';
  if (window.matchMedia && window.matchMedia(prefersDarkMatch).matches) {
    return 'dark';
  }

  return 'light';
};

export const setDefaultTheme = (theme) => {
  localStorage.setItem('theme', theme);
};
