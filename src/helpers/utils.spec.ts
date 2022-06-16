import { capitalize } from './utils';

describe('capitalize()', () => {
  it('should capitalize the string passed in', () => {
    expect(capitalize('hey')).toEqual('Hey');
    expect(capitalize('hey there')).toEqual('Hey there');
  });

  it('should return an empty string if an empty string is passed in', () => {
    expect(capitalize('')).toEqual('');
  });
});
