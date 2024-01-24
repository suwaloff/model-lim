import { Country } from 'entities/Country/model/types/Country';
import { Currency } from 'entities/Currency/model/types/Currency';

export interface Profile {
  first?: string;
  lastname?: string;
  age?: number | string;
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
}
