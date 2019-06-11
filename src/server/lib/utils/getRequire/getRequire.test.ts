import { getRequire } from './getRequire';

// tslint:disable no-string-literal
describe('dynamgetRequireicRequire', () => {
  afterAll(() => {
    delete global['__webpack_require__'];
    delete global['__non_webpack_require__'];
  });

  it('should return require from global.__non_webpack_require__]', () => {
    const nonWebpackRequire = (global['__non_webpack_require__'] = jest.fn());
    global['__webpack_require__'] = jest.fn();
    const result = getRequire();
    delete global['__webpack_require__'];

    expect(result).toEqual(nonWebpackRequire);
  });

  it('should return native require', () => {
    const nonWebpackRequire = (global['__non_webpack_require__'] = jest.fn());
    const result = getRequire();

    expect(result).not.toEqual(nonWebpackRequire);
    expect(typeof require).toBe('function');
  });
});
