import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileErrors } from './getProfileErrors';
import { ValidateProfileError } from '../../types/Profile';

describe('getProfileErrors.test', () => {
  test('should return errors', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        validateErrors: [
          ValidateProfileError.INCORRECT_USER_AGE,
          ValidateProfileError.INCORRECT_USER_DATA,
        ],
      },
    };
    expect(getProfileErrors(state as StateSchema)).toEqual([
      ValidateProfileError.INCORRECT_USER_AGE,
      ValidateProfileError.INCORRECT_USER_DATA,
    ]);
  });
  test('should return undefined', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileErrors(state as StateSchema)).toEqual(undefined);
  });
});
