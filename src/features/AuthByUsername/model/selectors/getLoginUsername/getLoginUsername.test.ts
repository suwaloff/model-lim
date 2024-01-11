import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginUsername } from './getLoginUsername';

describe('getLoginUsername.test', () => {
  test('should return Username', () => {
    const state: DeepPartial<StateSchema> = {
      login: {
        username: 'User',
      },
    };
    expect(getLoginUsername(state as StateSchema)).toEqual('User');
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginUsername(state as StateSchema)).toEqual('');
  });
});
