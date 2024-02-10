import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileData } from './getProfileData';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';

describe('getProfileData.test', () => {
  test('should return correct profile data', () => {
    const data = {
      first: 'Игорь',
      lastname: 'Сувалов',
      username: 'Lima',
      age: '34',
      city: 'Гомель',
      currency: Currency.USD,
      country: Country.Belarus,
    };
    const state: DeepPartial<StateSchema> = {
      profile: { data: data },
    };
    expect(getProfileData(state as StateSchema)).toEqual(data);
  });
  test('should return undefined when state is empty', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileData(state as StateSchema)).toEqual(undefined);
  });
});
