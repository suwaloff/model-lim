import { CounterSchema } from 'entities/Counter';
import { UserShema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername/model/types/LoginSchema';
import { AnyAction, CombinedState, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { ProfileShema } from 'entities/Profile';
import { AxiosInstance } from 'axios';
import { NavigateOptions, To } from 'react-router-dom';
import { ArticleDetailsShema } from 'entities/Article';
import { ArticleDetailsCommentShema } from 'pages/articleDetailsPage';
import { AddCommentFormSchema } from 'features/addCommentForm';
import { ArticlesPageShema } from 'pages/articlesPage';
import { SaveScrollSchema } from 'widgets/Page/saveScroll';

export interface StateSchema {
  counter: CounterSchema;
  user: UserShema;
  saveScroll: SaveScrollSchema;

  // Async
  login?: LoginSchema;
  profile?: ProfileShema;
  articleDetails?: ArticleDetailsShema;
  articleDetailsComment?: ArticleDetailsCommentShema;
  addCommentForm?: AddCommentFormSchema;
  articlesPage?: ArticlesPageShema;
}

export interface ReduxStoreWithManager extends ToolkitStore<StateSchema> {
  reducerManager: ReducerManager;
}

export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
  getMountedReducers: () => MountedReducers;
}

export type StateSchemaKey = keyof StateSchema;

interface ThunkExtraArg {
  api: AxiosInstance;
  navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}
