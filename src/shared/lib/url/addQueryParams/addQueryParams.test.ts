import { getQueryParams } from './addQueryParams';

describe('addQueryParams', () => {
  test('with only one param', () => {
    const params = getQueryParams({ test: 'qaz' });
    expect(params).toBe('?test=qaz');
  });

  test('with two params', () => {
    expect(getQueryParams({ test: 'qaz', test2: 'qwe' })).toBe('?test=qaz&test2=qwe');
  });

  test('test with undefined', () => {
    expect(getQueryParams({ test: 'qaz', test2: undefined })).toBe('?test=qaz');
  });
});
