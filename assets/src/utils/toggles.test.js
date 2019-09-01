import { isToggleOn } from './toggles';

const toggle = 'test';
const toggleKey = 'toggle-test';

describe('Toggles helper', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return false when toggle is not stored neither overriden', () => {
    expect(isToggleOn(toggle)).toBeFalsy();
  });

  it('should return true when toggle is stored as ON and it is not overriden', () => {
    localStorage.setItem(toggleKey, 'on');
    expect(isToggleOn(toggle)).toBeTruthy();
  });

  it('should return false when toggle is stored as OFF and it is not overriden', () => {
    localStorage.setItem(toggleKey, 'off');
    expect(isToggleOn(toggle)).toBeFalsy();
  });

  it('should return true when toggle is stored as OFF but it is overriden as ON', () => {
    window.history.pushState({}, 'Testing with toggle on', '/?test=on');
    localStorage.setItem(toggleKey, 'off');
    expect(isToggleOn(toggle)).toBeTruthy();
  });

  it('should return false when toggle is stored as ON but it is overriden as OFF', () => {
    window.history.pushState({}, 'Testing with toggle off', '/?test=off');
    localStorage.setItem(toggleKey, 'on');
    expect(isToggleOn(toggle)).toBeFalsy();
  });

  it('should persist the state in local storage when it is overriden', () => {
    window.history.pushState({}, 'Testing with toggle off', '/?test=bla');
    expect(isToggleOn(toggle)).toBeFalsy();
    expect(localStorage.getItem(toggleKey)).toEqual('bla');
  });
});
