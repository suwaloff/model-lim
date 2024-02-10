import { validateProfileData } from './validateProfileData';
import { ValidateProfileError } from '../../types/Profile';

const data = {
  first: 'Игорь',
  lastname: 'Сувалов',
  username: 'Lima',
  age: '34',
  city: 'Гомель',
};

describe('validateProfileData.test', () => {
  test('success', async () => {
    const result = validateProfileData(data);
    expect(result).toEqual([]);
  });
  test('without name', async () => {
    const result = validateProfileData({ ...data, first: '' });
    expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
  });
  test('incorrect user age', async () => {
    const result = validateProfileData({ ...data, age: '120' });
    expect(result).toEqual([ValidateProfileError.INCORRECT_USER_AGE]);
  });
  test('user age not number', async () => {
    const result = validateProfileData({ ...data, age: 'sd' });
    expect(result).toEqual([ValidateProfileError.INCORRECT_USER_AGE]);
  });
});
