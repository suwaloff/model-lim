import { Country } from 'entities/Country/model/types/Country';
import { Currency } from 'entities/Currency/model/types/Currency';

export enum ValidateProfileError {
  INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
  INCORRECT_USER_AGE = 'INCORRECT_USER_AGE',
  NO_DATA = 'NO_DATA',
}

export interface Profile {
  first?: string;
  lastname?: string;
  age?: string;
  currency?: Currency;
  country?: Country;
  city?: string;
  username?: string;
  avatar?: string;
}

export interface ProfileShema {
  data?: Profile;
  isLoading: boolean;
  error?: string;
  readonly: boolean;
  form?: Profile;
  validateErrors?: ValidateProfileError[];
}
