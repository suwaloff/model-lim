import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileForm } from './getProfileForm';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';

describe('getProfileForm.test', () => {
  test('should return correct profile data', () => {
    const form = {
      first: 'Игорь',
      lastname: 'Сувалов',
      username: 'Lima',
      age: '34',
      city: 'Гомель',
      currency: Currency.USD,
      country: Country.Belarus,
    };
    const state: DeepPartial<StateSchema> = {
      profile: { form },
    };
    expect(getProfileForm(state as StateSchema)).toEqual(form);
  });
  test('should return undefined when state is empty', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileForm(state as StateSchema)).toEqual(undefined);
  });
});
