import { CounterSchema } from 'entities/Counter';
import { UserShema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername/model/types/LoginSchema';

export interface StateSchema {
  counter: CounterSchema;
  user: UserShema;
  login: LoginSchema;
}
