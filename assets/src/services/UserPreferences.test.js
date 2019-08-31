import {
  getRegion, setRegion, clearRegion, getDefaultTheme, setDefaultTheme,
} from './UserPreferences';

jest.mock('./helpers');

const region = 'quito';

describe('UserPreferences', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('region preference', () => {
    it('should get the region from local storage', () => {
      localStorage.setItem('region', region);

      expect(getRegion()).toEqual(region);
    });

    it('should set the region in local storage', () => {
      setRegion(region);
      expect(localStorage.getItem('region')).toEqual(region);
    });

    it('should clear the region in local storage', () => {
      clearRegion();
      expect(localStorage.getItem('region')).toBeNull();
    });
  });

  describe('theme preference', () => {
    it('should return light if no theme preference is defined', () => {
      expect(getDefaultTheme()).toEqual('light');
    });

    it('should get default theme from local storage if it is defined', () => {
      localStorage.setItem('theme', 'dark');

      expect(getDefaultTheme()).toEqual('dark');
    });

    it('should set the default theme in local storage', () => {
      setDefaultTheme('dark');
      expect(localStorage.getItem('theme')).toEqual('dark');
    });
  });
});
