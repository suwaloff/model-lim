import { Profile, ValidateProfileError } from '../../types/Profile';

export const validateProfileData = (profile?: Profile) => {
  if (!profile) {
    return [ValidateProfileError.NO_DATA];
  }
  const { username, lastname, first, city, age } = profile;

  const errors: ValidateProfileError[] = [];

  if (!first || !lastname || !username || !city || !age) {
    errors.push(ValidateProfileError.INCORRECT_USER_DATA);
  }

  const ageAsNumber: number = parseInt(age!, 10);

  if (ageAsNumber > 100 || ageAsNumber < 1 || !Number.isInteger(ageAsNumber)) {
    errors.push(ValidateProfileError.INCORRECT_USER_AGE);
  }

  return errors;
};
